import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipaFacilDrawerComponent } from '@cipafacil/components/drawer/drawer.component';

@NgModule({
    declarations: [
        CipaFacilDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        CipaFacilDrawerComponent
    ]
})
export class CipaFacilDrawerModule
{
}
