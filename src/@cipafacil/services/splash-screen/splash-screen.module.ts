import { NgModule } from '@angular/core';
import { CipaFacilSplashScreenService } from '@cipafacil/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        CipaFacilSplashScreenService
    ]
})
export class CipaFacilSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilSplashScreenService: CipaFacilSplashScreenService)
    {
    }
}
