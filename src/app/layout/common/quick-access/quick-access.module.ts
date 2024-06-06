import {NgModule} from '@angular/core';
import {QuickAccessComponent} from './quick-access.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        QuickAccessComponent
    ],
    exports: [
        QuickAccessComponent
    ],
    imports: [
        SharedModule,
        RouterModule
    ]
})
export class QuickAccessModule {
}
