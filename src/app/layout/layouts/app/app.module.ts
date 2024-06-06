import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {CipaFacilNavigationModule} from '@inovite/components/navigation';
import {MessagesModule} from 'app/layout/common/messages/messages.module';
import {NotificationsModule} from 'app/layout/common/notifications/notifications.module';
import {SearchModule} from 'app/layout/common/search/search.module';
import {ShortcutsModule} from 'app/layout/common/shortcuts/shortcuts.module';
import {UserMenuModule} from 'app/layout/common/user-menu/user-menu.module';
import {SharedModule} from 'app/shared/shared.module';
import {AppLayoutComponent} from './app.component';
import {DashboardModule} from '../../../modules/dashboard/dashboard.module';
import {CarouselModule} from '../../common/carousel/carousel.module';
import {QuickAccessModule} from '../../common/quick-access/quick-access.module';
import {CheckinModule} from "../../common/checkin/checkin.module";

@NgModule({
    declarations: [
        AppLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        CipaFacilNavigationModule,
        MessagesModule,
        NotificationsModule,
        CarouselModule,
        SearchModule,
        ShortcutsModule,
        UserMenuModule,
        SharedModule,
        QuickAccessModule,
        CheckinModule
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule {
}
