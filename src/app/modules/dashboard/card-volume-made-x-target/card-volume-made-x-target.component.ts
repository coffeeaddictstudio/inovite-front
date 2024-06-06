import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ApexOptions} from 'ng-apexcharts';
import {StatementService} from '../../statement/statement.service';
import {StatementBalance} from '../../statement/statement.types';
import {UserService} from '../../../core/user/user.service';
import {DatePipe} from '@angular/common';
import {CurrencyBRL} from '../../../core/pipes/currency';
import {AppService} from '../../../app.service';
import moment, {Moment} from 'moment';

@Component({
    selector: 'dashboard-card-volume-made-x-target',
    templateUrl: './card-volume-made-x-target.component.html',
    styleUrls: ['./card-volume-made-x-target.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardVolumeMadeXTargetComponent implements OnInit
{
    chart: ApexOptions;
    totals: Array<StatementBalance> = new Array<StatementBalance>();
    months: number = 3;
    hasPermission: boolean = false;
    resize: any;
    lastMonths: number = 3;
    loaded: boolean = false;
    now: Moment = moment();

    public data = [
        { name: 'Pedro', percentage: 130 },
        { name: 'Driele', percentage: 113 },
        { name: 'Valéria', percentage: 107 },
        { name: 'Euclides', percentage: 105 },
        { name: 'Luis F.', percentage: 100 },
        { name: 'Gabriel', percentage: 97 },
        { name: 'Osmar', percentage: 95 },
        { name: 'Daleon', percentage: 94 },
        { name: 'Francisco', percentage: 90 },
        { name: 'Leronardo', percentage: 90 },
    ];

    /**
     * Constructor
     */
    constructor(
        private _statementService: StatementService,
        private _userService: UserService,
        private _datePipe: DatePipe,
        private _currentPipe: CurrencyBRL,
        public appService: AppService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.hasPermission = this.appService.hasPermission('statement_view');
        if (!this.hasPermission) {
            return;
        }

       /* if (window.innerWidth < 960) {
            this.months = 1;
        } else {
            this.months = 3;
        }
        this.getTotals();*/

        this._prepareChartData();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    @HostListener('window:resize', ['$event'])
    onResize(event?): void {
        clearTimeout(this.resize);
        this.resize = setTimeout(() => {
            if (window.innerWidth < 960) {
                this.months = 1;
            } else {
                this.months = 3;
            }

            if (this.months !== this.lastMonths) {
                this.lastMonths = this.months;
                this.totals = new Array<StatementBalance>();
                this.chart = undefined;
                this.loaded = false;
                this.getTotals();
            }
        }, 100);
    }

    getTotals(): void
    {
        if (this.months <= -1) {
            this._prepareChartData();
            return;
        }

        const month = moment(this.now).locale('pt-br');
        month.subtract(this.months, 'month');

        this._statementService.getBalance(month.format('M'), month.format('Y'))
            .subscribe((totals) => {
                this.months -= 1;

                if (!totals?.contasInternas?.saldoAnteriorPositivo) {
                    totals.contasInternas.saldoAnterior = -Math.abs(totals.contasInternas.saldoAnterior);
                }

                if (!totals?.contasInternas?.saldoFinalPositivo) {
                    totals.contasInternas.saldoFinal = -Math.abs(totals.contasInternas.saldoFinal);
                }

                totals.month = month.format('MMMM');
                this.totals.push(totals);
                this.getTotals();
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        const names = this.data.map(item => item.name);
        const percentages = this.data.map(item => item.percentage);

        this.chart = {
            series: [{
                name: 'Porcentagens',
                data: percentages
            }],
            legend: {
                show: false
            },
            chart: {
                type: 'bar',
                height: 300,
                toolbar: {
                    show: false
                },

            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '15%',
                    rangeBarOverlap: true
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                    return val + '%';
                },
                offsetX: 150, // Adjust the vertical position of the data label
                style: {
                    fontSize: '12px',
                    colors: ['#000000']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['transparent']
            },
            xaxis: {
                categories: names,
                labels: {
                    show: true,
                    offsetX: -50, // Adjust the horizontal position of the labels
                }
            },
            yaxis: {
                title: {
                    style: {
                        color: 'transparent'
                    }
                },
                labels: {
                    formatter: (val) => {
                        return `${val}`;
                    }
                },
                max: 200
            },
            fill: {
                opacity: 1,
                colors: ['#ea580c']
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return `${val}%`;
                    }
                }
            }
        };

        this.loaded = true;
    }

}
