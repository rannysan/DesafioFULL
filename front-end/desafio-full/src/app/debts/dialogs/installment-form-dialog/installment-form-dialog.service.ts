import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { InstallmentFormDialogComponent } from './installment-form-dialog.component';
import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';

@Injectable()
export class InstallmentFormDialogService {

    constructor(public dialog: MatDialog) { }

    openDialog(debt: IDebtDetails, installmentId?: number): Observable<boolean> {
        const dialogRef = this.dialog.open(InstallmentFormDialogComponent, {
            width: '400px',
        });

        dialogRef.componentInstance.debt = debt;
        dialogRef.componentInstance.installmentId = installmentId;

        return dialogRef.afterClosed();
    }
}
