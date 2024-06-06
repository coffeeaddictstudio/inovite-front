import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-suplier',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss']
})
export class DashboardSuplierComponent implements OnInit, OnDestroy
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
        this.cipaFacilCard = localStorage.getItem('cipafacil_card');

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserNode) => {
                 this.user = user;

                 if (!this.user.condominium_active) {
                     localStorage.removeItem('condominium');
                     localStorage.removeItem('condominium_code');
                   /*  return this._router.navigateByUrl('/empresas');*/
                 }
            });

        this._dashboardService.show();
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

