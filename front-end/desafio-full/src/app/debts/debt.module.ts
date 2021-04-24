import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtListCardComponent } from './debt-list-card/debt-list-card.component';
import { DebtFormComponent } from './debt-form/debt-form.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtComponent } from './debt/debt.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,

        DebtRoutingModule
    ],
    exports: [

    ],
    declarations: [
        DebtListCardComponent,
        DebtFormComponent,
        DebtListComponent,
        DebtComponent
    ],
})
export class DebtModule { }
