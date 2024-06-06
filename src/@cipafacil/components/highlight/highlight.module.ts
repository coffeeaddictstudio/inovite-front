import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipaFacilHighlightComponent } from '@cipafacil/components/highlight/highlight.component';

@NgModule({
    declarations   : [
        CipaFacilHighlightComponent
    ],
    imports        : [
        CommonModule
    ],
    exports        : [
        CipaFacilHighlightComponent
    ],
    entryComponents: [
        CipaFacilHighlightComponent
    ]
})
export class CipaFacilHighlightModule
{
}
