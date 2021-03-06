import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';
import { DebtFormComponent } from '../debt-form/debt-form.component';
import { DebtListComponent } from '../debt-list/debt-list.component';
import { ConfirmDialogService } from '../dialogs/confirm-dialog/confirm-dialog.service';
import { DebtService } from '../shared/debt.service';

@Component({
  selector: 'app-debt-bottom-sheet',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtBottomSheetComponent implements OnInit {

  @ViewChild('form', { static: true }) formComponent?: DebtFormComponent;

  debt: IDebtDetails = {} as IDebtDetails;

  constructor(
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<DebtBottomSheetComponent>,
    private confirmDialogService: ConfirmDialogService,
    private debtService: DebtService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public bottomSheetData: { id: number },
  ) { }

  ngOnInit(): void {
    if (this.bottomSheetData && this.bottomSheetData.id)
      this.debt.id = this.bottomSheetData.id;

    if (this.debt && this.debt.id) {
      this.debtService
        .getDebtsById(this.debt.id)
        .subscribe((result: IServiceResponse<IDebtDetails>) => {
          if (result.success) {
            this.debt = result.data;
            this.formComponent?.patchForm(this.debt);
          }

          this.cdRef.markForCheck();
        }, (error) => {

        });
    }

    this.bottomSheetRef.backdropClick().subscribe(() => {
      this.checkCancel();
    });
  }

  checkCancel(): void {
    if (this.formComponent?.form.dirty) {
      this.confirmDialogService
        .confirm('Descartar Altera????es', 'Ao descartar, as mudan??as realizadas ser??o perdidas.', 'DESCARTAR')
        .subscribe((rs: boolean) => {
          if (rs)
            this.bottomSheetRef.dismiss(false);
        });
    } else {
      this.bottomSheetRef.dismiss(false);
    }
  }

  delete(): void {

    this.confirmDialogService
      .confirm('Remover', 'Deseja realmente deletar esta d??vida?', 'REMOVER')
      .subscribe((res: boolean) => {
        if (!res)
          return;

        this.debtService
          .delete(this.debt.id)
          .subscribe((result: IServiceResponse<null>) => {
            if (result.success) {
              this.snackBar.open(`D??vida n??mero ${this.debt.titleNumber} deletada com sucesso.`, '', {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });

              this.bottomSheetRef.dismiss(false);
            }

            this.cdRef.markForCheck();
          }, (error) => {
            this.snackBar.open(`N??o foi poss??vel deletar a d??vida.`, '', {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          });
      });
  }

  save(): void {

    if (!this.formComponent?.isValid())
      return;

    this.debt = this.assignObject();

    this.debtService
      .save(this.debt)
      .subscribe((result: IServiceResponse<number>) => {
        if (result.success) {
          this.snackBar.open(`D??vida ${!this.debt.id ? 'cadastrada' : 'editada'} com sucesso.`, '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([`${this.router.url.split(/\/(new|edit)\/?/gi)[0]}/edit/${result.data}`]);
        }

        this.cdRef.markForCheck();
      }, () => {

        this.snackBar.open('N??o foi poss??vel salvar os dados.', '', { duration: 4000 });
        this.cdRef.markForCheck();
      });
  }

  assignObject(): IDebtDetails {
    const fData = this.formComponent?.form.value;
    const newDebt: IDebtDetails = Object.assign(this.debt, fData);
    return newDebt;
  }
}

@Component({
  selector: 'app-debt',
  template: '',
})
export class DebtComponent {
  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private debtListComponent: DebtListComponent,
  ) {
    setTimeout(() => { this.openBottomSheet(); }, 0);
  }

  openBottomSheet(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    const bottomSheetRef = this.bottomSheet.open(DebtBottomSheetComponent, {
      panelClass: 'bottom-sheet',
      disableClose: true,
      data: { id: id },
    });

    bottomSheetRef
      .afterDismissed()
      .subscribe((res: boolean) => {
        this.router.navigate([this.router.url.split(/\/(new|edit)\/?/gi)[0]]);

        this.debtListComponent.refresh();
      });
  }
}
