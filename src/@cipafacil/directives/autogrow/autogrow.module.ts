import { NgModule } from '@angular/core';
import { CipaFacilAutogrowDirective } from '@cipafacil/directives/autogrow/autogrow.directive';

@NgModule({
    declarations: [
        CipaFacilAutogrowDirective
    ],
    exports     : [
        CipaFacilAutogrowDirective
    ]
})
export class CipaFacilAutogrowModule
{
}
