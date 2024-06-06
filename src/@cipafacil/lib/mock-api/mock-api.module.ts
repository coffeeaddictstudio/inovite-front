import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CIPAFACIL_MOCK_API_DEFAULT_DELAY } from '@cipafacil/lib/mock-api/mock-api.constants';
import { CipaFacilMockApiInterceptor } from '@cipafacil/lib/mock-api/mock-api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: CipaFacilMockApiInterceptor,
            multi   : true
        }
    ]
})
export class CipaFacilMockApiModule
{
    /**
     * CipaFacilMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<CipaFacilMockApiModule>
    {
        return {
            ngModule : CipaFacilMockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => () => null,
                    multi     : true
                },
                {
                    provide : CIPAFACIL_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
