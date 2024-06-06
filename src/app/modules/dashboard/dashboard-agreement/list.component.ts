import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-agreement',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss']
})
export class DashboardAgreementComponent implements OnInit, OnDestroy
{
    user: UserNode;
    selectedMenu: string = '';
    open: boolean = false;
    cipaFacilCard: string;
    loading: boolean = false;

    agreements = {
        price_regular: 9.49,
        volume_realizado: 4000,
        price_promotion: 0,
        sell_out: 0,
        sell_in: 0,
        volume_projetado: 0,
        acordo_projetado: 0,
        acordo_realizado: 0,
        rec_margem: 0,
    };

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
        this.cipaFacilCard = localStorage.getItem('cipafacil_card');

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserNode) => {
                 this.user = user;

                 if (!this.user.condominium_active) {
                     localStorage.removeItem('condominium');
                     localStorage.removeItem('condominium_code');
                     return this._router.navigateByUrl('/condominios');
                 }
            });

        this._dashboardService.show();
    }

    calculate(): void{
        this.agreements.acordo_projetado = (this.agreements.sell_out * this.agreements.volume_projetado);
        this.agreements.acordo_realizado = (this.agreements.sell_out * this.agreements.volume_realizado);
        this.agreements.rec_margem = ((this.agreements.acordo_realizado / (this.agreements.price_promotion * this.agreements.volume_realizado)) * 100);

        if (typeof this.agreements.rec_margem === 'number') {
            this.agreements.rec_margem = parseFloat(this.agreements.rec_margem.toFixed(2));
        }
        console.log(this.agreements.acordo_realizado, this.agreements.price_promotion, this.agreements.volume_realizado);

        this._changeDetectorRef.markForCheck();
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
