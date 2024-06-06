import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-commercial',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class DashboardCommercialComponent implements OnInit, OnDestroy
{
    user: UserNode;
    selectedMenu: string = '';
    open: boolean = false;
    cipaFacilCard: string;
    loading: boolean = false;


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dashboardService: DashboardService
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
        this._dashboardService.getLoja()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    console.log(response);
                    this._changeDetectorRef.markForCheck();
                },
                (error) => {
                    console.error('Error during estruturas:', error);
                }
            )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._dashboardService.hide();
    }

    /**
     * Close cipa facil card
     */
    closeCipaFacilCard(): void {
        this.cipaFacilCard = 'false';

        localStorage.setItem('cipafacil_card', 'false');
    }

    onLoadCards(){
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 50000);
    }
}
