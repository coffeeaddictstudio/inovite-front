import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {StatementService} from '../../statement/statement.service';
import {StatementBalance} from '../../statement/statement.types';
import {UserService} from '../../../core/user/user.service';
import {DatePipe} from '@angular/common';
import {CurrencyBRL} from '../../../core/pipes/currency';
import {AppService} from '../../../app.service';
import moment, {Moment} from 'moment';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexTooltip,
    ApexXAxis,
    ApexLegend,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexYAxis, ApexOptions
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    markers: any;
    stroke: any;
    yaxis: ApexYAxis | ApexYAxis[];
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'dashboard-card-realized-margins-x-target',
    templateUrl: './card-realized-margins-x-target.component.html',
    styleUrls: ['./card-realized-margins-x-target.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardRealizedMarginsXTargetComponent implements OnInit
{
    @ViewChild('chart') chart: ChartComponent;
    public chartOptionsMargemRealizado: ApexOptions;
    public chartOptionsMargemMeta: ApexOptions;
    public chartOptionsCashRealizado: ApexOptions;
    public colors = ['#16a34a', '#1e3a8a', '#475569'];

    loaded: boolean = false;
    hasPermission: boolean = false;
    /**
     * Constructor
     */
    constructor() {
        // Primeiro gráfico (line chart para Margem Realizado)
        this.chartOptionsMargemRealizado = {
            series: [
                {
                    name: 'Margem Realizado',
                    data: [20.14, 34.44, 35.13, 31.96, 21.35, 23.53, 22.35, 39.81, 15.65, 16.35],
                    type: 'line',
                    color: '#16a34a'
                }
            ],
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            chart: {
                height: 100,
                type: 'line',
                stacked: false,
                background: 'transparent',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
                offsetY: 225
            },
            dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                    return val + '%';
                },
            },
            stroke: {
                width: [3]
            },
            xaxis: {
                labels: {
                    show: false
                },
            },
            yaxis: {
                labels: {
                    show: false
                },
                max: 200,
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
                },
            },
            fill: {
                opacity: 1,
                colors: ['#16a34a'],
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            },
        };

        // Segundo gráfico (line chart para Margem Meta)
        this.chartOptionsMargemMeta = {
            series: [
                {
                    name: 'Margem Meta',
                    data: [22.09, 34.84, 31.66, 31.47, 22.00, 26.80, 26.55, 44.43, 18.73, 20.21],
                    type: 'line',
                    color: '#1e3a8a'
                }
            ],
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            chart: {
                height: 50,
                type: 'line',
                stacked: false,
                background: 'transparent',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
                offsetY: 100
            },
            dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                    return val + '%';
                },
            },
            stroke: {
                width: [3]
            },
            xaxis: {
                categories: ['', '', '', '', '', '', '', '', '', '', ''],
                labels: {
                    show: false
                },
            },
            yaxis: {
                labels: {
                    show: false
                },
                max: 2000,
                opposite: true
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
                },
                x: {
                    formatter: (val) => {
                        return `${val}%`;
                    }
                }
            },
            fill: {
                opacity: 1,
                colors: ['#1e3a8a'],
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        };

        // Segundo gráfico (line chart para Margem Meta)
        this.chartOptionsCashRealizado = {
            series: [
                {
                    name: 'Cash Realizado',
                    data: [101, 101, 101, 98, 97, 94, 89, 87, 87, 76],
                    type: 'bar'
                }
            ],
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
            },
            chart: {
                height: 350,
                type: 'bar',
                stacked: false,
                background: 'transparent',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val, opts) {
                    return val + '%';
                },
            },
            xaxis: {
                categories: ['Osmar', 'Carlos', 'Driele', 'Leonardo', 'Euclides', 'Valeria', 'Luis F.', 'Gabriel', 'Francisco', 'Deleon', 'Pedro']
            },
            yaxis: {
                labels: {
                    show: false
                },
                max: 200
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
            fill: {
                opacity: 1,
                colors: ['#475569'],
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        };

        /*this.chartOptions = {
            series: [
                {
                    name: 'Margem Realizado',
                    data: [20.14, 34.44, 35.13, 31.96, 21.35, 23.53, 22.35, 39.81, 15.65, 16.35],
                    type: 'line',
                },
                {
                    name: 'Margem Meta',
                    data: [22.09, 34.84, 31.66, 31.47, 22.00, 26.80, 26.55, 44.43, 18.73, 20.21],
                    type: 'line'
                },
                {
                    name: '%Cash Realizado',
                    data: [101, 101, 101, 98, 97, 94, 89, 87, 87, 76],
                    type: 'bar',
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
            },
            dataLabels: {
                enabled: true,
            },
            stroke: {
                width: [3, 3, 0]
            },
            xaxis: {
                categories: ['Osmar', 'Carlos', 'Driele', 'Leonardo', 'Euclides', 'Valeria', 'Luis F.', 'Gabriel', 'Francisco', 'Deleon', 'Pedro']
            },
            yaxis: {
                max: 200
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
                horizontalAlign: 'left',
                offsetX: 40
            }
        };

        this.chartOptions.series.forEach((serie, index) => {
            serie.color = this.colors[index];
        });*/
    }

    ngOnInit(): void {
        this.hasPermission = true;
        this.loaded = true;
    }
}
