import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Assembly} from '../../../assembly/assembly.types';
import {AssemblyService} from '../../../assembly/assembly.service';

@Component({
    selector: 'notice-dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class NoticeDialogComponent implements OnInit
{
    assembly: Assembly;
    todayDate: Date = new Date();
    description: string = `Os condôminos poderão se fazer representar por procuradores, devidamente credenciados por procurações, que atendam a todas as formalidades legais.\n\nRecomendação de Protocolo para Assembleias de forma presencial ou híbrida:\n\nDisponibilização de álcool gel no ambiente da assembleia aos moradores; antes e após a realização da assembleia o ambiente deverá ser limpo; Arrumação das cadeiras deverá ter distanciamento social de pelo menos 2 a 4m; recomendamos (opcional) o uso da máscara de forma individual.`;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<NoticeDialogComponent>,
        private _assemblyService: AssemblyService
    ) {
        if (data) {
            this.assembly = data;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Approve Notice
     */
    approveNotice(): void
    {
        console.log('ola');

        // Update edital to next step
        this._assemblyService.updateCurrentStep({assembly: this.assembly.id, action: 'complete', step: 4}).subscribe({
            next: () => {
                // Close dialog
                this.closeDialog(true, 'approved');
            }
        });
    }

    /**
     * Reject Notice
     */
    rejectNotice(): void
    {
        // Get current step_id
        const step = this.assembly.steps.find(s => s.order === 4);

        // Update to previous step
        this._assemblyService.update(this.assembly.id, {status_id: 3, current_step: 3, completed: 2}).subscribe({
            next: () => {
                // Close dialog
                this.closeDialog(true, 'rejected');
            }
        });
    }

    closeDialog(close: boolean = false, status?: 'approved' | 'rejected'): void {
        this.dialogRef.close({close, status});
    }


}
