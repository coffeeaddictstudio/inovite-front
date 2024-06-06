import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../core/user/user.service';
import {AppService} from '../../../app.service';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-card-service-order',
    templateUrl: './card-service-order.component.html',
    styleUrls: ['./card-service-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardCardServiceOrderComponent implements OnInit {
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
            '#ceee5f',
            '#f58b45',
            '#5cab11',
            '#5cd5f1',
            '#b40c1e',
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
            '#ceee5f',
            '#f58b45',
            '#5cab11',
            '#5cd5f1',
            '#b40c1e',
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

    spacesChart = {
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
            categories: [],
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

    typeActionsChart = {
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
        this.hasPermission = this.appService.hasPermission('operational_manager_view_service_order');
        if (!this.hasPermission) {
            return;
        }

        this.getChartInfo();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getChartInfo(): void {
        this._dashboardService.getServiceOrderChartInfo().subscribe((response) => {
            response.status.forEach((status) => {
                this.totalStatus = this.totalStatus + Number(status.quantidade);
                this.statusChart.labels.push(status.situacao);
                this.statusChart.series.push(Number(status.quantidade));
            });

            response.prazos.forEach((prazo) => {
                this.totalPrazo = this.totalPrazo + Number(prazo.quantidade);
                this.openAndInProgressChart.labels.push(prazo.prazo);
                this.openAndInProgressChart.series.push(Number(prazo.quantidade));
            });


            response.spaces.forEach((space) => {
                if (this.spacesChart.series.length < 9) {
                    this.spacesChart.series.push(
                        {
                            name: space.local,
                            data: [Number(space.quantidade)],
                            color: '#f58b45'
                        }
                    );
                    let name = space.local.substring(0, 16);
                    if (space.local.length > 16) {
                        name += '...';
                    }

                    this.spacesChart.xaxis.categories.push(name);
                }
            });


            response.typeActions.forEach((type) => {
                if (this.typeActionsChart.series.length < 9) {
                    this.typeActionsChart.series.push({
                        name: type.acao,
                        data: [Number(type.quantidade)],
                        color: '#ceee5f'
                    });
                    this.typeActionsChart.xaxis.categories.push(type.acao);
                }
            });


            this.loaded = true;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    getPercentage(value: number, total: number): string {
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
