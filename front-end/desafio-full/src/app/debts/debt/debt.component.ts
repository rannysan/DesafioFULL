import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';
import { DebtFormComponent } from '../debt-form/debt-form.component';
import { DebtListComponent } from '../debt-list/debt-list.component';
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
    this.bottomSheetRef.dismiss(false);
  }

  delete(): void {
    this.debtService
      .delete(this.debt.id)
      .subscribe((result: IServiceResponse<null>) => {
        if (result.success) {
          this.snackBar.open(`Dívida número ${this.debt.titleNumber} deletada com sucesso.`, '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          this.bottomSheetRef.dismiss(false);
        }

        this.cdRef.markForCheck();
      }, (error) => {

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
          this.snackBar.open(`Dívida ${!this.debt.id ? 'cadastrada' : 'editada'} com sucesso.`, '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([`${this.router.url.split(/\/(new|edit)\/?/gi)[0]}/edit/${result.data}`]);
        }

        this.cdRef.markForCheck();
      }, () => {

        this.snackBar.open('Não foi possível salvar os dados.', '', { duration: 4000 });
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
