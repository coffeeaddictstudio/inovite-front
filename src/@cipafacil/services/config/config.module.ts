import { ModuleWithProviders, NgModule } from '@angular/core';
import { CipaFacilConfigService } from '@cipafacil/services/config/config.service';
import { CIPAFACIL_APP_CONFIG } from '@cipafacil/services/config/config.constants';

@NgModule()
export class CipaFacilConfigModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilConfigService: CipaFacilConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<CipaFacilConfigModule>
    {
        return {
            ngModule : CipaFacilConfigModule,
            providers: [
                {
                    provide : CIPAFACIL_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
