import { NgModule } from '@angular/core';
import { CipaFacilUtilsService } from '@cipafacil/services/utils/utils.service';

@NgModule({
    providers: [
        CipaFacilUtilsService
    ]
})
export class CipaFacilUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilUtilsService: CipaFacilUtilsService)
    {
    }
}
