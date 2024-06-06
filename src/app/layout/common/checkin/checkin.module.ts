import {NgModule} from '@angular/core';
import {CheckinComponent} from './checkin.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CheckinDialogResultComponent} from './dialog-result/dialog-result.component';

@NgModule({
    declarations: [
        CheckinComponent,
        CheckinDialogResultComponent
    ],
    exports: [
        CheckinComponent
    ],
    imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class CheckinModule {
}
