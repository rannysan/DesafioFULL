import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IInstallmentDetails } from 'src/app/view-models/installments/installment-details.interface';
import { InstallmentFormDialogService } from '../dialogs/installment-form-dialog/installment-form-dialog.service';
import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';
import { InstallmentService } from '../shared/installment.service.service';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';
import { ConfirmDialogService } from '../dialogs/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallmentComponent implements OnInit {
  @Input() debt: IDebtDetails = {} as IDebtDetails;

  installments: IInstallmentDetails[] = {} as IInstallmentDetails[];

  panelOpenState = false;

  constructor(
    private confirmDialogService: ConfirmDialogService,
    private installmentFormDialogService: InstallmentFormDialogService,
    private installmentService: InstallmentService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.installmentService
      .getInstallments(this.debt.id)
      .subscribe((result: IServiceResponse<IInstallmentDetails[]>) => {
        if (result.success)
          this.installments = result.data;

        this.cdRef.markForCheck();
      }, () => {
        this.snackBar.open("Não foi possível carregar as parcelas da dívida.", '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  create(): void {
    this.installmentFormDialogService
      .openDialog(this.debt)
      .subscribe((result: boolean) => {
        if (result)
          this.refresh();
      });;
  }

  edit(id: number): void {
    this.installmentFormDialogService
      .openDialog(this.debt, id)
      .subscribe((result: boolean) => {
        if (result)
          this.refresh();
      });;
  }

  delete(id: number): void {

    this.confirmDialogService
      .confirm('Remover', 'Deseja realmente deletar esta dívida?', 'REMOVER')
      .subscribe((res: boolean) => {
        if (!res)
          return;

        this.installmentService
          .delete(id)
          .subscribe((result: IServiceResponse<null>) => {
            if (result.success) {
              this.snackBar.open("Parcela deletada com sucesso.", '', {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.refresh();
            }
          });;
      });
  }

}
