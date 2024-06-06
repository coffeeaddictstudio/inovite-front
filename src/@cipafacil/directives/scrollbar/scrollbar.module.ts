import { NgModule } from '@angular/core';
import { CipaFacilScrollbarDirective } from '@cipafacil/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        CipaFacilScrollbarDirective
    ],
    exports     : [
        CipaFacilScrollbarDirective
    ]
})
export class CipaFacilScrollbarModule
{
}
