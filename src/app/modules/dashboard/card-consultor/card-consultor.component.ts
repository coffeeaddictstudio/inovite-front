import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CondominiumUser} from '../../condominium/condominium.types';
import {DashboardService} from '../dashboard.service';
import {AppService} from '../../../app.service';

@Component({
    selector: 'dashboard-card-consultor',
    templateUrl: './card-consultor.component.html',
    styleUrls: ['./card-consultor.component.scss']
})
export class DashboardCardConsultorComponent implements OnInit {
    condominiumUser: CondominiumUser;
    loading: boolean = true;

    constructor(
        private _dashboardService: DashboardService,
        public _appService: AppService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._dashboardService.findConsultor()
            .subscribe((response) => {
                this.condominiumUser = response;
                this.loading = false;
                this._changeDetectorRef.markForCheck();
            });
    }

}
