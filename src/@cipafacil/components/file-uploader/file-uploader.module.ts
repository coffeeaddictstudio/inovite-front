import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CipaFacilFileUploaderComponent} from './file-uploader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatIconModule} from '@angular/material/icon';
import {CipaFacilAlertModule} from '../alert';

@NgModule({
    declarations: [
        CipaFacilFileUploaderComponent
    ],
    imports     : [
        CommonModule,
        MatProgressSpinnerModule,
        NgxDropzoneModule,
        MatIconModule,
        CipaFacilAlertModule
    ],
    exports     : [
        CipaFacilFileUploaderComponent
    ]
})
export class CipaFacilFileUploader
{
}
