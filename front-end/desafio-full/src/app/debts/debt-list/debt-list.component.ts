import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDebtList } from 'src/app/view-models/debts/debt-list.interface';
import { IInstallmentDetails } from 'src/app/view-models/installments/installment-details.interface';
import { IServiceResponse } from 'src/app/view-models/service-response.interface';
import { DebtService } from '../shared/debt.service';
import { InstallmentService } from '../shared/installment.service.service';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtListComponent implements OnInit {

  debts: IDebtList[] = [];

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private debtService: DebtService,
    private installmentService: InstallmentService,
  ) { }

  ngOnInit(): void {
    this.refresh();
    // this.filterData({ searchTerm: '' });
  }

  refresh(): void {
    this.debtService.getDebts().subscribe((result: IServiceResponse<IDebtList[]>) => {
      if (result.success) {
        this.debts = result.data;

        this.debts.map(d => {
          this.calculateValues(d);
        })

        console.log(this.debts);
      }

      this.cdRef.markForCheck();
    }, (error) => {
      console.log(error);
    });
  }

  openBottomSheet(id?: number): void {
    if (!id)
      this.router.navigate([`${this.router.url.split(/\/(new|edit)\/?/gi)[0]}/new`]);
    else
      this.router.navigate([`${this.router.url.split(/\/(new|edit)\/?/gi)[0]}/edit/${id}`]);
  }

  calculateValues(debt: IDebtList): void {
    this.installmentService
      .getInstallments(debt.id)
      .subscribe((result: IServiceResponse<IInstallmentDetails[]>) => {
        let originalValue = 0;
        let updatedValue = 0;
        let maxDelay = 0;
        let currentDate = new Date();

        if (result.success) {
          result.data.map(i => {
            originalValue += i.value;

            var date1 = new Date(currentDate);
            var date2 = new Date(i.dueDate);

            var timeDiff = Math.abs(date1.getTime() - date2.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays > 0)
              updatedValue += ((debt.interestPercentageRate / 100) / 30) * diffDays * i.value;
            else
              updatedValue += i.value;

            if (diffDays > maxDelay)
              maxDelay = diffDays;

            updatedValue = parseFloat(updatedValue.toFixed(2));
          });

          debt.originalValue = originalValue;
          debt.updateValue = originalValue + updatedValue + (originalValue * debt.penaltyPercentageRate / 100);
          debt.updateValue = debt.updateValue.toFixed(2);
          debt.daysOfDelay = maxDelay;
          debt.numberOfInstallments = result.data.length;
        }

        this.cdRef.markForCheck();
      });
    this.cdRef.markForCheck();
  }

  // filterData(event: any): void {
  //   this.paginator.firstPage();

  //   const search = _.deburr((event.searchTerm === undefined ? this.filters.search : event.searchTerm) || '').toLowerCase();

  //   if (search && search !== '')
  //     this.filters.search = search;
  //   else
  //     this.filters.search = null;

  //   this.refresh();
  // }

}
