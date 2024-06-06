import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {dashboardRoutes} from './dashboard.routing';
import {SharedModule} from '../../shared/shared.module';
import {DashboardCardSalesShareComponent} from './card-sales-share/card-sales-share.component';
import {DashboardCardServicesComponent} from './card-services/card-services.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DashboardCardDocumentManagerComponent} from './card-document-manager/card-document-manager.component';
import {MatIconModule} from '@angular/material/icon';
import {DashboardCardUnpaidBillComponent} from './card-unpaid-bill/card-unpaid-bill.component';
import {DashboardCardSalesBillingComponent} from './card-sales-billing/card-sales-billing.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {
    DashboardCardSalesMadeXTargetComponent,
} from './card-sales-made-x-target/card-sales-made-x-target.component';
import {DashboardFloatingSurveyComponent} from './floating-survey/floating-survey.component';
import {DashboardCardBoletoComponent} from './card-boleto/card-boleto.component';
import {DebtorService} from '../debtor/debtor.service';
import {BoletoListComponent} from '../boleto/list/list.component';
import {MatRadioModule} from '@angular/material/radio';
import {QuickAccessModule} from '../../layout/common/quick-access/quick-access.module';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DashboardFloatingMotoboyComponent} from './floating-motoboy/floating-motoboy.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CipaFacilCardModule} from '../../../@inovite/components/card';
import {MatInputModule} from '@angular/material/input';
import {DashboardFloatingNoticeComponent} from './floating-notice/floating-notice.component';
import {NoticeDialogComponent} from './floating-notice/dialog/dialog.component';
import {DashboardCardConsultorComponent} from './card-consultor/card-consultor.component';
import {DashboardCardTaskComponent} from './card-task/card-task.component';
import {DashboardCardServiceOrderComponent} from './card-service-order/card-service-order.component';
import {DashboardCardPrepostoComponent} from './card-preposto/card-preposto.component';
import {DashboardCardEvolutionComponent} from './card-evolution/card-evolution.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {DashboardCommercialComponent} from './dashboard-commercial/list.component';
import {DashboardPromotionalComponent} from './dashboard-promotional/list.component';
import {DashboardCardVolumeMadeXTargetComponent} from './card-volume-made-x-target/card-volume-made-x-target.component';
import {DashboardCardVolumeBillingComponent} from './card-volume-billing/card-volume-billing.component';
import {DashboardCardVolumeShareComponent} from './card-volume-share/card-volume-share.component';
import {
    DashboardCardRealizedMarginsXTargetComponent
} from './card-realized-margins-x-target/card-realized-margins-x-target.component';
import {DashboardCardMARegularComponent} from './card-ma-regular/card-ma-regular.component';
import {
    DashboardCardAmountRealizedXGoalComponent
} from './card-amount-realized-x-goal/card-amount-realized-x-goal.component';
import {DashboardCardBudgetComponent} from './card-budget/card-budget.component';
import {DashboardCardBudgetShareComponent} from './card-budget-share/card-volume-share.component';
import {DashboardCardEvolutionMonthComponent} from './card-evolution-month/card-evolution-month.component';
import {DashboardCardEvolutionRegionalComponent} from './card-evolution-regional/card-evolution-regional.component';
import {DashboardCardResultComponent} from './card-result/card-result.component';
import {NgxCurrencyModule} from 'ngx-currency';
import {DashboardAgreementComponent} from './dashboard-agreement/list.component';
import {DashboardSuplierComponent} from './dashboard-supplier/list.component';
import {DashboardCardEvolutionSalesComponent} from './card-evolution-sales/card-evolution-sales.component';
import {
    DashboardCardEvolutionSalesRegionalComponent
} from './card-evolution-sales-regional/card-evolution-sales-regional.component';
import {
    DashboardCardSupplierEvolutionSalesComponent
} from './card-supplier-evolution-sales/card-supplier-evolution-sales.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {DashboardCardOrderFillRateComponent} from './card-order-fill-rate/card-order-fill-rate.component';
import {DashboardCardResultSupplierComponent} from "./card-result-supplier/card-result.component";

@NgModule({
    declarations: [
        DashboardCommercialComponent,
        DashboardPromotionalComponent,
        DashboardCardSalesShareComponent,
        DashboardCardServicesComponent,
        DashboardCardDocumentManagerComponent,
        DashboardCardUnpaidBillComponent,
        DashboardCardSalesBillingComponent,
        DashboardCardSalesMadeXTargetComponent,
        DashboardFloatingSurveyComponent,
        DashboardFloatingMotoboyComponent,
        DashboardCardBoletoComponent,
        DashboardFloatingNoticeComponent,
        NoticeDialogComponent,
        DashboardCardConsultorComponent,
        DashboardCardPrepostoComponent,
        DashboardCardTaskComponent,
        DashboardCardServiceOrderComponent,
        DashboardCardEvolutionComponent,
        DashboardCardVolumeMadeXTargetComponent,
        DashboardCardVolumeBillingComponent,
        DashboardCardVolumeShareComponent,
        DashboardCardRealizedMarginsXTargetComponent,
        DashboardCardMARegularComponent,
        DashboardCardAmountRealizedXGoalComponent,
        DashboardCardBudgetComponent,
        DashboardCardBudgetShareComponent,
        DashboardCardEvolutionMonthComponent,
        DashboardCardEvolutionRegionalComponent,
        DashboardCardResultComponent,
        DashboardAgreementComponent,
        DashboardSuplierComponent,
        DashboardCardEvolutionSalesComponent,
        DashboardCardEvolutionSalesRegionalComponent,
        DashboardCardSupplierEvolutionSalesComponent,
        DashboardCardOrderFillRateComponent,
        DashboardCardResultSupplierComponent
    ],
    imports: [
        RouterModule.forChild(dashboardRoutes),
        SharedModule,
        IvyCarouselModule,
        MatProgressSpinnerModule,
        MatIconModule,
        NgApexchartsModule,
        MatRadioModule,
        QuickAccessModule,
        MatButtonModule,
        MatSnackBarModule,
        ClipboardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTooltipModule,
        CipaFacilCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule,
        NgxMaskModule,
        NgxMaterialTimepickerModule,
        NgxCurrencyModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
    ],
    providers: [
        DebtorService,
        BoletoListComponent,
        MatDatepickerModule
    ]
})
export class DashboardModule {
}
