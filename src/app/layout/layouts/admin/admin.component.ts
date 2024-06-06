import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component, Inject,
    OnChanges,
    OnDestroy,
    OnInit, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CipaFacilMediaWatcherService } from '@inovite/services/media-watcher';
import {CipaFacilNavigationItem, CipaFacilNavigationService} from '@inovite/components/navigation';
import { InitialData } from 'app/app.types';
import {CondominiumService} from '../../../modules/condominium/condominium.service';
import {Condominium} from '../../../modules/condominium/condominium.types';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {DashboardService} from '../../../modules/dashboard/dashboard.service';
import {AppService} from '../../../app.service';
import {Platform} from '@ionic/angular';
import {DOCUMENT} from '@angular/common';

@Component({
    selector     : 'admin-layout',
    templateUrl  : './admin.component.html',
    styleUrls    : ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterContentInit
{
    verticalNavigation: CipaFacilNavigationItem[];
    horizontalNavigation: CipaFacilNavigationItem[];
    data: InitialData;
    isScreenSmall: boolean;
    isDashboard: boolean = false;
    condominium: Condominium;
    hasCondominium: boolean = true;
    user: UserNode;
    title: string = '';
    isIos: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _cipafacilMediaWatcherService: CipaFacilMediaWatcherService,
        private _cipafacilNavigationService: CipaFacilNavigationService,
        private _condominiumService: CondominiumService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _dashboardService: DashboardService,
        private _platform: Platform,
        public appService: AppService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the resolved route mock-api
        this._activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
            // this.navigation = this.data.navigation.vertical;
        });



        this._platform.ready()
            .then(() => {
                if (this._platform.is('iphone') || this._platform.is('ios')) {
                    this.isIos = true;
                    this._document.body.classList.add('iphone');

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
            });

        this._router.events.subscribe(() => {
            this._activatedRoute.firstChild.data.subscribe((data) => {
                this.title = data.title ? data.title : '';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        });

        // Get user logged
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserNode) => {
                this.user = user;

                if (!this.user.condominium_active) {
                    this.toggleCondominium();
                }
            });

        // Subscribe to media changes
        this._cipafacilMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        this.syncUser();
    }

    /**
     * On after content init
     */
    ngAfterContentInit(): void
    {
        // Show carousel if page is dashboard
        this._dashboardService.isDashboard$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((show: boolean) => {
                this.isDashboard = show;

                // Mark for check
                this._changeDetectorRef.detectChanges();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    syncUser(): void
    {

    }

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._cipafacilNavigationService.getComponent(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    /**
     * Toggle condominium list
     */
    toggleCondominium(): any
    {

    }

    back(): void
    {
        history.back();
    }
}
