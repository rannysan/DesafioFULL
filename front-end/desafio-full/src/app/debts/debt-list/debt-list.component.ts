import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IDebtList } from 'src/app/view-models/debts/debt-list.interface';
import { DebtService } from '../shared/debt.service';

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
  ) { }

  ngOnInit(): void {
    this.refresh();
    // this.filterData({ searchTerm: '' });
  }

  refresh(): void {
    this.debtService.getDebts().subscribe((result) => {
      if (result.success)
        this.debts = result.data;

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
