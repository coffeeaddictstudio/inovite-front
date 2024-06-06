import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CipaService} from '../../services/services.types';
import {Agreement} from '../../agreements/agreements.types';
import {Subject} from 'rxjs';
import {AgreementsService} from '../../agreements/agreements.service';
import {takeUntil} from 'rxjs/operators';
import {AppService} from '../../../app.service';

@Component({
    selector: 'dashboard-card-ma-regular',
    templateUrl: './card-ma-regular.component.html',
    styleUrls: ['./card-ma-regular.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardCardMARegularComponent implements OnInit
{
    agreements: Agreement[];
    loading: boolean = true;
    total: number = 0;
    hasPermission: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _agreementsService: AgreementsService,
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
        this.hasPermission = this.appService.hasPermission('agreements_view');
        if (!this.hasPermission) {
            return;
        }

        this.loading = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
