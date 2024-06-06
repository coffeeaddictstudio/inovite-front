import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dialog-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogConfirmationComponent implements OnInit
{
    title: string = '';
    message: string = '';
    confirmButtonText = 'Sim';
    cancelButtonText = 'Cancelar';

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogConfirmationComponent>
    ) {
        if (data) {
            this.title = data.title || this.title;
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On confirm click
     *
     * @param status
     */
    onConfirm(status: boolean = false): void
    {
        this.dialogRef.close({
            status,
            data: this.data
        });
    }
}
