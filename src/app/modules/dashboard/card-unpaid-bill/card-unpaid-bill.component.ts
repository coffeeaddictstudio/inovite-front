import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UnpaidBill} from '../../unpaid-bill/unpaid-bill.types';
import {Subject} from 'rxjs';
import {UnpaidBillService} from '../../unpaid-bill/unpaid-bill.service';
import {takeUntil} from 'rxjs/operators';
import {AppService} from '../../../app.service';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
    selector: 'dashboard-card-unpaid-bill',
    templateUrl: './card-unpaid-bill.component.html',
    styleUrls: ['./card-unpaid-bill.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardCardUnpaidBillComponent implements OnInit
{
    bills: UnpaidBill[];
    loading: boolean = true;
    hasPermission: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _unpaidBillService: UnpaidBillService,
        private _authService: AuthService,
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
        this.hasPermission = this.appService.hasPermission('unpaid_bill_view');
        if (!this.hasPermission) {
            return;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
