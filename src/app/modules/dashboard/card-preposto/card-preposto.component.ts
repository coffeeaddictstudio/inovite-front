import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CondominiumUser} from '../../condominium/condominium.types';
import {DashboardService} from '../dashboard.service';
import {AppService} from '../../../app.service';

@Component({
    selector: 'dashboard-card-preposto',
    templateUrl: './card-preposto.component.html',
    styleUrls: ['./card-preposto.component.scss']
})
export class DashboardCardPrepostoComponent implements OnInit {
    condominiumUser: CondominiumUser;
    loading: boolean = true;

    constructor(
        private _dashboardService: DashboardService,
        public _appService: AppService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._dashboardService.findPreposto()
            .subscribe((response) => {
                this.condominiumUser = response;
                this.loading = false;
                this._changeDetectorRef.markForCheck();
            });
    }

}
