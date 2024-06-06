import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../core/user/user.service';
import {AppService} from '../../../app.service';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-card-task',
    templateUrl: './card-task.component.html',
    styleUrls: ['./card-task.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardCardTaskComponent implements OnInit {
    hasPermission: boolean = false;
    loaded: boolean = false;
    totalStatus: number = 0;
    totalPrazo: number = 0;
    statusChart = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '80%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        colors: [
            '#7b11fd',
            '#c563db',
            '#1a5fde',
            '#1ac1de',
            '#DE1A30',
        ],
        labels: [],
        plotOptions: {
            pie: {
                customScale: 1,
                expandOnClick: false,
                donut: {
                    size: '50%'
                }
            }
        },
        series: [],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: false
        }
    };

    openAndInProgressChart = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '80%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        colors: [
            '#7b11fd',
            '#c563db',
            '#1a5fde',
            '#1ac1de',
            '#DE1A30',
        ],
        labels: [],
        plotOptions: {
            pie: {
                customScale: 1,
                expandOnClick: false,
                donut: {
                    size: '50%'
                }
            }
        },
        series: [],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark'
        }
    };

    typeChart = {
        series: [],
        chart: {
            toolbar: {
                show: false
            },
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '100%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: []
        },
        yaxis: {
            title: {
                text: 'Quantidade'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {}
    };

    originChart = {
        chart: {
            toolbar: {
                show: false
            },
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '100%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [],
        xaxis: {
            categories: []
        },
        yaxis: {
            title: {
                text: 'Quantidade'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {},
    };

    /**
     * Constructor
     */
    constructor(
        private _dashboardService: DashboardService,
        private _userService: UserService,
        private _changeDetectorRef: ChangeDetectorRef,
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
        this.hasPermission = this.appService.hasPermission('operational_manager_view_tasks');
        if (!this.hasPermission) {
            return;
        }

        this.getChartInfo();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getChartInfo(): void {
        this._dashboardService.getTaskChartInfo().subscribe((response) => {
            response.status.forEach((status) => {
                this.totalStatus = this.totalStatus + Number (status.quantidade);
                this.statusChart.labels.push(status.situacao);
                this.statusChart.series.push(Number (status.quantidade));
            });

            response.prazos.forEach((prazo) => {
                this.totalPrazo = this.totalPrazo + Number (prazo.quantidade);
                this.openAndInProgressChart.labels.push(prazo.prazo);
                this.openAndInProgressChart.series.push(Number (prazo.quantidade));
            });

            response.types.forEach((type) => {
                this.typeChart.series.push(
                    {
                        name: type.tipo,
                        data: [Number(type.quantidade)],
                        color: '#ca11fd'
                    }
                );
                this.typeChart.xaxis.categories.push(type.tipo);
            });

            response.origins.forEach((origin) => {
               this.originChart.series.push({
                   name: origin.origem,
                   data: [Number(origin.quantidade)],
                   color: '#6011fd'
               });
               this.originChart.xaxis.categories.push(origin.origem);
            });

            this.loaded = true;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    getPercentage(value: number, total: number): string
    {
        if (value && total) {
            return ((Number(value) * 100) / Number(total)).toFixed(1);
        } else {
            return '0';
        }
    }

    verifyQuantity(series: any): boolean {
        return series.length ? series.reduce((a, i) => a + i) : false;
    }

}
