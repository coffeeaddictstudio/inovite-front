import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CipaFacilDrawerModule } from '@inovite/components/drawer';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {AppLayoutModule} from './layouts/app/app.module';
import {AdminLayoutModule} from './layouts/admin/admin.module';

const layoutModules = [
    EmptyLayoutModule,
    AppLayoutModule,
    AdminLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatTooltipModule,
        CipaFacilDrawerModule,
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
