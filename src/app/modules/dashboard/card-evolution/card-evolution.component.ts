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
    selector: 'dashboard-card-evolution',
    templateUrl: './card-evolution.component.html',
    styleUrls: ['./card-evolution.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardEvolutionComponent implements OnInit {
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
        const categories = ['Mercearia Doce', 'Limpeza', 'Açougue', 'Bebidas', ' Açougue', 'Higiene', 'Padaria'];

        const series = [
            {
                name: 'Venda',
                data: [54, -5, 15, 13, 2, 33, 21]
            },
            {
                name: 'Volume',
                data: [51, -1, 10, 35, 4, 2, -21]
            },
            {
                name: 'Cash',
                data: [52, -3, 12, 52, 7, -5, -5]
            },
            {
                name: 'Acordo',
                data: [56, -9, -5, 48, 9, -10, -10]
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
                    return val + '%';
                },
                offsetY: 60,
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
                max: 100
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
                        return `${val}%`;
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
