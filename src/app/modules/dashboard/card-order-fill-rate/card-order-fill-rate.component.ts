import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { CurrencyBRL } from '../../../core/pipes/currency';
import moment, { Moment } from 'moment';
import {ECharts, EChartsOption} from 'echarts';

@Component({
    selector: 'dashboard-card-order-fill-rate',
    templateUrl: './card-order-fill-rate.component.html',
    styleUrls: ['./card-order-fill-rate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardOrderFillRateComponent implements OnInit {
    chart: ApexOptions;
    months: number = 3;
    hasPermission: boolean = true; // For demo purposes, assuming the user has permission
    resize: any;
    lastMonths: number = 3;
    loaded: boolean = false;
    now: Moment = moment();
    pieChartOptions: EChartsOption;
    pie2ChartOptions: EChartsOption;
    pieChartInstance: ECharts;
    donutColors: string[] = [
        '#12a12f',
        '#FDA012',
        '#ACACAC',
        '#C52E3E',
        '#149CDE',
        '#177BB8',
        '#CD266F',
        '#1E3A8A',
        '#1e8a7a',
        '#831e8a',
    ];
    constructor(private _datePipe: DatePipe) {}

    ngOnInit(): void {
        if (!this.hasPermission) {
            return;
        }

        this.prepareCharts();
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
            this.prepareCharts();
        }
    }

    prepareCharts(): void {
        this.chart =  {
            series: [80, 20],
            chart: {
                type: 'pie',
            },
            labels: ['Total Entregue', 'Ruptura'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ],
            legend: {
                show: false
            },
            colors: ['#1E3A8A', '#ef4444', '#1E3A8A', '#ef4444']
        };
    }
}
