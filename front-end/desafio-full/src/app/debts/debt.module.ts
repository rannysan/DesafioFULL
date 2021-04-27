import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtFormComponent } from './debt-form/debt-form.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtBottomSheetComponent, DebtComponent } from './debt/debt.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,

        DebtRoutingModule,

        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatBottomSheetModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [

    ],
    declarations: [
        DebtFormComponent,
        DebtListComponent,
        DebtComponent,
        DebtBottomSheetComponent,
    ],
    entryComponents: [
        DebtBottomSheetComponent,
    ],
})
export class DebtModule { }
