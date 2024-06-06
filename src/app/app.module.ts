import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {InoviteModule} from '@inovite';
import {CipaFacilConfigModule} from '@inovite/services/config';
import {CipaFacilMockApiModule} from '@inovite/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import {IonicModule} from '@ionic/angular';
import {NgxHotjarModule, NgxHotjarRouterModule} from 'ngx-hotjar';
import {environment} from '../environments/environment';
import { BuyersComponent } from './modules/buyers/buyers.component';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
};

@NgModule({
    declarations: [
        AppComponent,
        BuyersComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        NgxHotjarModule.forRoot(environment.hotJarCode),
        NgxHotjarRouterModule,
        InoviteModule,
        CipaFacilConfigModule.forRoot(appConfig),
        CipaFacilMockApiModule.forRoot(mockApiServices),

        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({}),

        IonicModule.forRoot()
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
