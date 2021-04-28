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
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgxMaskModule } from 'ngx-mask';

import { DebtRoutingModule } from './debt-routing.module';
import { DebtFormComponent } from './debt-form/debt-form.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtBottomSheetComponent, DebtComponent } from './debt/debt.component';
import { InstallmentComponent } from './installment/installment.component';
import { InstallmentFormDialogComponent } from './dialogs/installment-form-dialog/installment-form-dialog.component';
import { InstallmentFormDialogService } from './dialogs/installment-form-dialog/installment-form-dialog.service';

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
        MatDividerModule,
        MatExpansionModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,

        NgxMaskModule.forRoot(),
    ],
    exports: [

    ],
    declarations: [
        DebtFormComponent,
        DebtListComponent,
        DebtComponent,
        DebtBottomSheetComponent,
        InstallmentComponent,
        InstallmentFormDialogComponent,
    ],
    entryComponents: [
        DebtBottomSheetComponent,
        InstallmentFormDialogComponent,
    ],
    providers: [
        InstallmentFormDialogService,
    ],
})
export class DebtModule { }
