import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CipaFacilAlertComponent } from '@cipafacil/components/alert/alert.component';

@NgModule({
    declarations: [
        CipaFacilAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        CipaFacilAlertComponent
    ]
})
export class CipaFacilAlertModule
{
}
