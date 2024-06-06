import { NgModule } from '@angular/core';
import { CipaFacilTailwindService } from '@cipafacil/services/tailwind/tailwind.service';

@NgModule({
    providers: [
        CipaFacilTailwindService
    ]
})
export class CipaFacilTailwindConfigModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilTailwindConfigService: CipaFacilTailwindService)
    {
    }
}
