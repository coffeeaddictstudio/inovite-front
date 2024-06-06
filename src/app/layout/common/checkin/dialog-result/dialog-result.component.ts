import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'checkin-dialog-result',
    templateUrl: './dialog-result.component.html',
    styleUrls: ['./dialog-result.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckinDialogResultComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
        }
    ) {
        console.log(data);
    }

    ngOnInit(): void {
    }

}
