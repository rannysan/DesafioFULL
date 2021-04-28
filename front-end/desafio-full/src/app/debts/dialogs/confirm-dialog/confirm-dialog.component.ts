import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  public buttonCancel = 'CANCELAR';
  public buttonOk = 'OK';
  public message: string = '';
  public title: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }
}