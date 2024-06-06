import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CipaFacilMediaWatcherModule } from '@cipafacil/services/media-watcher/media-watcher.module';
import { CipaFacilSplashScreenModule } from '@cipafacil/services/splash-screen/splash-screen.module';
import { CipaFacilTailwindConfigModule } from '@cipafacil/services/tailwind/tailwind.module';
import { CipaFacilUtilsModule } from '@cipafacil/services/utils/utils.module';
import {CipaFacilConfirmationModule} from '@cipafacil/services/confirmation/confirmation.module';

@NgModule({
    imports  : [
        CipaFacilConfirmationModule,
        CipaFacilMediaWatcherModule,
        CipaFacilSplashScreenModule,
        CipaFacilTailwindConfigModule,
        CipaFacilUtilsModule
    ],
    providers: [
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class CipaFacilModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: CipaFacilModule)
    {
        if ( parentModule )
        {
            throw new Error('CipaFacilModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
