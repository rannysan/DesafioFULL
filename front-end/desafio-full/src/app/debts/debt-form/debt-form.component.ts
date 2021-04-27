import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDebtDetails } from 'src/app/view-models/debts/debt-details.interface';

@Component({
  selector: 'app-debt-form',
  templateUrl: './debt-form.component.html',
  styleUrls: ['./debt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtFormComponent {

  @Input() debt: IDebtDetails = {} as IDebtDetails;

  @Output() save = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {
    this.form = new FormGroup({
      titleNumber: new FormControl(null, [Validators.required]),
      debtorName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      debtorCpf: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      interestPercentageRate: new FormControl(null, [Validators.required]),
      penaltyPercentageRate: new FormControl(null, [Validators.required]),
    });

  }

  isValid(): boolean {
    this.form.get('titleNumber')?.markAsTouched();
    this.form.get('debtorName')?.markAsTouched();
    this.form.get('debtorCpf')?.markAsTouched();
    this.form.get('interestPercentageRate')?.markAsTouched();
    this.form.get('penaltyPercentageRate')?.markAsTouched();

    this.cdRef.detectChanges();
    return this.form.valid;
  }

  patchForm(debt: IDebtDetails): void {
    this.form.reset(debt);
  }

}
