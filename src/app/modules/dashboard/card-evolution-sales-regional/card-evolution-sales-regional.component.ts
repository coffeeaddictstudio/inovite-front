import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { StatementService } from '../../statement/statement.service';
import { StatementBalance } from '../../statement/statement.types';
import { UserService } from '../../../core/user/user.service';
import { DatePipe } from '@angular/common';
import { CurrencyBRL } from '../../../core/pipes/currency';
import { AppService } from '../../../app.service';
import moment, { Moment } from 'moment';

@Component({
    selector: 'dashboard-card-evolution-sales-regional',
    templateUrl: './card-evolution-sales-regional.component.html',
    styleUrls: ['./card-evolution-sales-regional.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardEvolutionSalesRegionalComponent implements OnInit {
    chart: ApexOptions;
    months: number = 3;
    hasPermission: boolean = true; // For demo purposes, assuming the user has permission
    resize: any;
    lastMonths: number = 3;
    loaded: boolean = false;
    now: Moment = moment();

    constructor(private _datePipe: DatePipe) {}

    ngOnInit(): void {
        if (!this.hasPermission) {
            return;
        }

        this.getTotals();
    }

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
                this.chart = undefined;
                this.loaded = false;
                this.getTotals();
            }
        }, 100);
    }

    getTotals(): void {
        this.months -= 1;
        if (this.months >= 0) {
            this.getTotals();
        } else {
            this._prepareChartData();
        }
    }

    private _prepareChartData(): void {
        const categories = ['Regional 1', 'Regional 2', 'Regional 3', 'Regional 4', ];

        const series = [
            {
                name: '%Cresc. Geral',
                data: [5, 10, 5, 5]
            },
            {
                name: '%Cresc. Fornecedor',
                data: [10, -2, 10, 2]
            },
            {
                name: '%Part. Fornecedor Ant',
                data: [30, 25, 25, 20]
            },
            {
                name: '%part. Fornecedor',
                data: [25, 20, 25, 30]
            }
        ];

        this.chart = {
            series: series,
            chart: {
                type: 'bar',
                height: 300,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                    return val.toFixed(2) + '%';
                },
                offsetY: 40,
                style: {
                    fontSize: '12px',
                    colors: ['#000000']
                }
            },
            xaxis: {
                categories: categories,

            },
            yaxis: {
                title: {
                    style: {
                        color: 'transparent'
                    }
                },
                labels: {
                    show: false,
                },
                max: 100,
                min: -50
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
                        return `${val.toFixed(2)}%`;
                    }
                }
            },
            legend: {
                horizontalAlign: 'center',
                offsetY: 0,
                position: 'top'
            },
            colors: ['#1e3a8a', '#FF6400', '#475569', '#FFD700']
        };

        this.loaded = true;
    }
}
