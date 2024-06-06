import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipaFacilCardComponent } from '@cipafacil/components/card/card.component';

@NgModule({
    declarations: [
        CipaFacilCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        CipaFacilCardComponent
    ]
})
export class CipaFacilCardModule
{
}
