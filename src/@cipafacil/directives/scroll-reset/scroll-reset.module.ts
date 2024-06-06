import { NgModule } from '@angular/core';
import { CipaFacilScrollResetDirective } from '@cipafacil/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        CipaFacilScrollResetDirective
    ],
    exports     : [
        CipaFacilScrollResetDirective
    ]
})
export class CipaFacilScrollResetModule
{
}
