import {LOCALE_ID, NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthInterceptor} from 'app/core/auth/auth.interceptor';
import {registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {MAT_DATE_LOCALE} from '@angular/material/core';

registerLocaleData(ptBr);

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'pt-BR'
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt' }
    ]
})
export class CoreModule {
    /**
     * Constructor
     */
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry,
        @Optional() @SkipSelf() parentModule?: CoreModule
    ) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }

        // Register icon sets
        this._matIconRegistry.addSvgIconSet(this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('mat_outline', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('iconsmind', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/iconsmind.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('feather', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg'));

        // Register icon sets
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_solid', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-solid.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_regular', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-regular.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_brands', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-brands.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_light', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-light.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_thin', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-thin.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('awesome_duotone', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/awesome-duotone.svg'));
    }
}
