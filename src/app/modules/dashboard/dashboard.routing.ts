import {Route} from '@angular/router';
import {DashboardCommercialComponent} from './dashboard-commercial/list.component';
import {DashboardPromotionalComponent} from './dashboard-promotional/list.component';
import {DashboardAgreementComponent} from './dashboard-agreement/list.component';
import {DashboardSuplierComponent} from './dashboard-supplier/list.component';

export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardCommercialComponent
    },
    {
        path: 'dashboard-commercial',
        component: DashboardCommercialComponent
    },
    {
        path: 'dashboard-suppliers',
        component: DashboardSuplierComponent
    },
    {
        path: 'supplier-registration',
        component: DashboardAgreementComponent
    },
    {
        path: 'dashboard-promotional',
        component: DashboardPromotionalComponent
    },
];
