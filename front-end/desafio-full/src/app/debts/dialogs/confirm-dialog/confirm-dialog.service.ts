import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    constructor(
        private dialog: MatDialog
    ) { }

    public confirm(title: string, message: string, confirmButtonText?: string, cancelButtonText?: string): Observable<boolean> {
        const config: MatDialogConfig = {
            panelClass: '',
            maxWidth: '700px',
        };

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        if (confirmButtonText)
            dialogRef.componentInstance.buttonOk = confirmButtonText;
        if (cancelButtonText)
            dialogRef.componentInstance.buttonCancel = cancelButtonText;
        return dialogRef.afterClosed();
    }
}
