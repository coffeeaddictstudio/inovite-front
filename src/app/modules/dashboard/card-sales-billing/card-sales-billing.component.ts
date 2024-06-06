import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApexOptions} from 'ng-apexcharts';
import {DebtorService} from '../../debtor/debtor.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DebtorNonPaymentHistory, DebtorTotalNonPayment} from '../../debtor/debtor.types';
import {AppService} from '../../../app.service';
import {CurrencyBRL} from '../../../core/pipes/currency';
import { ChartComponent } from 'ng-apexcharts';

@Component({
    selector: 'dashboard-card-sales-billing',
    templateUrl: './card-sales-billing.component.html',
    styleUrls: ['./card-sales-billing.component.scss'],
    providers: [CurrencyBRL],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardSalesBillingComponent implements OnInit
{
    chartNewVsReturning: ApexOptions;
    totalNonPayment: DebtorTotalNonPayment;
    nonPaymentHistory: DebtorNonPaymentHistory;
    hasPermission: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _debtorService: DebtorService,
        private _changeDetectorRef: ChangeDetectorRef,
        private formatCurrency: CurrencyBRL,
        public appService: AppService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.hasPermission = this.appService.hasPermission('debtor_view');
        if (!this.hasPermission) {
            return;
        }

        const screenWidth = window.innerWidth;

        const chartWidth = screenWidth > 768 ? 500 : screenWidth - 100; // Ajuste conforme necessário

        this.areaChartOptions = {
            chart: {
                type: 'area',
                height: 300,
                width: chartWidth
            },
            xaxis: {
                categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
            },
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft',
                    offsetY: 30,
                    offsetX: 60
                },
                y: {
                    formatter: (val) => {
                        return `R$ ${val},00`;
                    }
                }
            }
        };

        this._prepareAreaChartData();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    areaChartOptions: ApexOptions;
    areaChartData: any;
    loaded: boolean = false;

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareAreaChartData(): void {
        // Substitua os dados de exemplo com os seus dados de faturamento
        const semanaAtual = [10000, 12000, 8000, 15000, 11000, 20000, 3000];
        const semanaAnterior = [8000, 10000, 7000, 12000, 9000, 5000, 1000];

        this.areaChartData = [
            {
                name: 'Semana Atual',
                data: semanaAtual
            },
            {
                name: 'Semana Anterior',
                data: semanaAnterior
            }
        ];

        this.areaChartData.forEach((dataset) => {
            dataset.data = dataset.data.map(value => parseFloat(value)); // Converte para número
        });

        this.loaded = true;
    }

}
