import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {CipaServicesService} from '../../services/services.service';
import {takeUntil} from 'rxjs/operators';
import {CipaService, ServiceCipa} from '../../services/services.types';
import {Subject} from 'rxjs';
import {CipaFacilMediaWatcherService} from '../../../../@inovite/services/media-watcher';
import {AppService} from '../../../app.service';

@Component({
    selector: 'dashboard-card-services',
    templateUrl: './card-services.component.html',
    styleUrls: ['./card-services.component.scss']
})
export class DashboardCardServicesComponent implements OnInit, OnDestroy
{
    services: ServiceCipa[];
    loading: boolean = true;
    hasPermission: boolean = false;

    cellsToShow: number = 5;
    cellWidth: number = 20;
    run;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _cipaServicesService: CipaServicesService,
        private _cipaFacilMediaWatcher: CipaFacilMediaWatcherService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _render: Renderer2,
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
        this.hasPermission = this.appService.hasPermission('cipa_services_view');
        if (!this.hasPermission) {
            return;
        }

        this.onGetServiceCipa();

        this.onResize();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        clearTimeout(this.run);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    @HostListener('window:resize', ['$event'])
    onResize(event?): void {
        if (window.innerWidth < 500) {
            this.cellsToShow = 1;
            this.cellWidth = 100;
        } else if (window.innerWidth > 500 && window.innerWidth < 960) {
            this.cellsToShow = 3;
            this.cellWidth = 33;
        } else {
            this.cellsToShow = 5;
            this.cellWidth = 20;
        }
    }

    /**
     * Change carrousel in interval 3 sec
     */
    carouselChange(): void
    {
        this.run = setTimeout(() => {
            const doc = document.getElementsByClassName('carousel-arrow-next');
            if (doc.length) {
                doc[0].dispatchEvent(new Event('click'));
                this.carouselChange();
            }
        }, 3000);
    }

    /**
     * Take all Service Cipa
     * @param search
     */
    onGetServiceCipa(): void {
        this.loading = true;
        // Get all ServiceOrder
        this._cipaServicesService.getAllServiceCipa(1, 50, '', 'vantagens').subscribe(() => {
            this.loading = false;
        });
        this._cipaServicesService.servicesCipa$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((serviceCipa: ServiceCipa[]) => {
                this.services = serviceCipa;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}
