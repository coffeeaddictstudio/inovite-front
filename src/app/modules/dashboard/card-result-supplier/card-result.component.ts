import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CurrencyBRL } from '../../../core/pipes/currency';


@Component({
    selector: 'dashboard-card-result-supplier',
    templateUrl: './card-result.component.html',
    styleUrls: ['./card-result.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe, CurrencyBRL]
})
export class DashboardCardResultSupplierComponent implements OnInit {
    hasPermission: boolean = true;
    loaded: boolean = true;

    constructor(private _datePipe: DatePipe) {}

    ngOnInit(): void {
        if (!this.hasPermission) {
            return;
        }
    }

}
