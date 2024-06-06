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
    selector: 'dashboard-card-evolution-sales',
    templateUrl: './card-evolution-sales.component.html',
    styleUrls: ['./card-evolution-sales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardEvolutionSalesComponent implements OnInit {
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
        const categories = ['Balas e Confeitos', 'Chocolates', 'Doces e Sobremesas', 'Matinais', 'Biscoito Doce', 'Biscoito Salgado', 'Lacteos', 'Leite Fermentado', 'Leite Condensado', 'Suplementos'];

        const series = [
            {
                name: '%Cresc. Geral',
                data: [15, 10, 5, 5, 10, 5, 8, 10, 6, 5]
            },
            {
                name: '%Cresc. Fornecedor',
                data: [5, -2, -10, 12, 2, 10, 5, 15, 20, -5]
            },
            {
                name: '%Part. Fornecedor Ant',
                data: [10, 10, 30, 25, 5, 35, 8, 30, 40, 8]
            },
            {
                name: '%part. Fornecedor',
                data: [7, 8, 20, 39, 10, 38, 10, 25, 46, 5]
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
                offsetY: 40,
                style: {
                    fontSize: '8px',
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
