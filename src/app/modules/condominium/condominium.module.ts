import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CondominiumListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {condominiumRoutes} from './condominium.routing';
import {SharedModule} from '../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IonicModule} from '@ionic/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormEnterpriseComponent } from './form-enterprise/form-enterprise.component';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
    declarations: [
        CondominiumListComponent,
        FormEnterpriseComponent
    ],
    imports: [
        RouterModule.forChild(condominiumRoutes),
        SharedModule,
        MatIconModule,
        MatProgressSpinnerModule,
        IonicModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgxMaskModule
    ]
})
export class CondominiumModule {
}
