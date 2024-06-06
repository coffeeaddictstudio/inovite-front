import {NgModule} from '@angular/core';
import {DialogConfirmationComponent} from './confirmation/confirmation.component';
import {DialogInfoComponent} from './info/info.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DialogLoadingComponent} from './loading/loading.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogsService} from './dialogs.service';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        DialogConfirmationComponent,
        DialogInfoComponent,
        DialogLoadingComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        DialogConfirmationComponent
    ],
    providers: [
        DialogsService
    ]
})
export class DialogsModule {
}
