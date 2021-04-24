import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtComponent } from './debt/debt.component';
import { CoreComponent } from '../core/core.component';


const routes: Routes = [
    {
        path: '', component: CoreComponent, children: [
            {
                path: '',
                component: DebtListComponent,
                children: [
                    {
                        path: 'new',
                        component: DebtComponent,
                    },
                    {
                        path: 'edit/:identifier/:name',
                        component: DebtComponent,
                    },
                ]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DebtRoutingModule { }
