import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CipaFacilConfirmationService } from '@cipafacil/services/confirmation/confirmation.service';
import { CipaFacilConfirmationDialogComponent } from '@cipafacil/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CipaFacilConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        CipaFacilConfirmationService
    ]
})
export class CipaFacilConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilConfirmationService: CipaFacilConfirmationService)
    {
    }
}
