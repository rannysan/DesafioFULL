import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';

import { IInstallmentDetails } from 'src/app/view-models/installments/installment-details.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';
import { InstallmentService } from '../../shared/installment.service.service';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-installment-form-dialog',
  templateUrl: './installment-form-dialog.component.html',
  styleUrls: ['./installment-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallmentFormDialogComponent implements OnInit {

  installment: IInstallmentDetails = {} as IInstallmentDetails;

  debt: IDebtDetails = {} as IDebtDetails;
  installmentId?: number;

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InstallmentFormDialogComponent>,
    private confirmDialogService: ConfirmDialogService,
    private installmentService: InstallmentService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      number: new FormControl(null, [Validators.required]),
      dueDate: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.installmentId) {
      this.installmentService
        .getDInstallmentById(this.installmentId)
        .subscribe((result: IServiceResponse<IInstallmentDetails>) => {
          if (result.success) {
            this.installment = result.data;
            this.form.reset(this.installment);

            this.cdRef.markForCheck();
          }
        }, () => {
          this.snackBar.open('Erro ao carregar parcela.', '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        });
    }

    this.dialogRef.backdropClick().subscribe(() => {
      this.cancel();
    });
  }

  cancel(): void {
    if (this.form.dirty) {
      this.confirmDialogService
        .confirm('Descartar Alterações', 'Ao descartar, as mudanças realizadas serão perdidas.', 'DESCARTAR')
        .subscribe((rs: boolean) => {
          if (rs)
            this.dialogRef.close(true);
        });
    } else {
      this.dialogRef.close(true);
    }
  }

  save(): void {

    this.installment = this.assignObject();

    this.installmentService
      .save(this.installment)
      .subscribe((data: IServiceResponse<null>) => {

        this.dialogRef.close(true);

      }, () => {

        this.snackBar.open('Não foi possível salvar os dados da parcela.', '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  assignObject(): IInstallmentDetails {
    const fData = this.form.value;
    const installment: IInstallmentDetails = Object.assign(this.installment, fData);

    installment.debtId = this.debt.id;

    return installment;
  }
}
