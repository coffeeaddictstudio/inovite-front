import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CurrencyBRL} from '../core/pipes/currency';
import {CursorEndDirective} from '../core/pipes/cursor-end';
import {OnlyNumberDirective} from '../core/pipes/only-number';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogsService} from '../layout/common/dialogs/dialogs.service';
import {MaskDirective} from '../core/directives/date-mask';
import {ConvertDateMonth} from 'app/core/pipes/convert-date-month';
import {TimeDirective} from '../core/pipes/time';
import {PhoneDirective} from '../core/pipes/phone';
import {FilterArray} from '../core/pipes/filter-array';
import {DocumentDirective} from '../core/pipes/document';
import {DocumentMaskDirective} from '../core/directives/document-mask';
import {DocumentMaskProviderDirective} from '../core/directives/document-mask-provider';
import {MatCustomDialog} from "../core/services/mat-custom-dialog.service";

@NgModule({
    declarations: [
        CurrencyBRL,
        CursorEndDirective,
        OnlyNumberDirective,
        MaskDirective,
        DocumentMaskDirective,
        DocumentMaskProviderDirective,
        ConvertDateMonth,
        TimeDirective,
        PhoneDirective,
        DocumentDirective,
        FilterArray
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        CurrencyBRL,
        CursorEndDirective,
        OnlyNumberDirective,
        MaskDirective,
        DocumentMaskDirective,
        DocumentMaskProviderDirective,
        ConvertDateMonth,
        TimeDirective,
        PhoneDirective,
        DocumentDirective,
        FilterArray
    ],
    providers: [
        DialogsService,
        MatCustomDialog
    ]
})
export class SharedModule
{
}
