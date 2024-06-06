import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivityService} from '../../../modules/activity/activity.service';
import {MatDialog} from '@angular/material/dialog';
import {CipaFacilConfirmationService} from '../../../../@inovite/services/confirmation';
import {AppService} from '../../../app.service';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import {CheckinService} from './checkin.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
    selector: 'checkin',
    templateUrl: './checkin.component.html',
    styleUrls: ['./checkin.component.scss'],
    providers: [BarcodeScanner, Geolocation, Diagnostic]
})
export class CheckinComponent implements OnInit
{
    isMobile: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private _activityService: ActivityService,
        private _barcodeScanner: BarcodeScanner,
        private _cipaFacilConfirmationDialog: CipaFacilConfirmationService,
        private _checkinService: CheckinService,
        private _geolocation: Geolocation,
        private _diagnostic: Diagnostic,
        private _platform: Platform,
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
        this._platform.ready()
            .then(() => {
                if (this._platform.is('cordova')) {
                    this.isMobile = true;
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    scan(): void
    {
        const options: BarcodeScannerOptions = {
            preferFrontCamera: false,
            showFlipCameraButton: false,
            showTorchButton: false,
            torchOn: false,
            prompt: 'Aponte a câmera para o QrCode',
            resultDisplayDuration: 500,
            formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
            orientation: 'portrait',
        };

        this._diagnostic.isLocationEnabled().then((enabled) => {
            if (enabled) {

                this._geolocation.getCurrentPosition().then((resp) => {
                    console.log(resp);

                    this._barcodeScanner.scan(options)
                        .then(barcodeData => {
                            if (!barcodeData.cancelled) {

                            }

                        }).catch(err => {
                        console.log('Error', err);
                    });
                }).catch((error) => {
                    console.log('Error getting location', JSON.stringify(error));

                    this._cipaFacilConfirmationDialog.open({
                        title: 'Opps.',
                        message: 'Você precisa permitir a localização do aparelho',
                        icon: {
                            show: true,
                            name: 'heroicons_outline:exclamation',
                            color: 'info'
                        },
                        actions: {
                            confirm: {
                                show: false,
                                label: 'Criar',
                                color: 'primary'
                            },
                            cancel: {
                                show: true,
                                label: 'Fechar'
                            }
                        },
                        dismissible: false
                    });
                });

            } else {
                this._cipaFacilConfirmationDialog.open({
                    title: 'Opps.',
                    message: 'Você precisa habilitar a permissão do aparelho',
                    icon: {
                        show: true,
                        name: 'heroicons_outline:exclamation',
                        color: 'info'
                    },
                    actions: {
                        confirm: {
                            show: false,
                            label: 'Criar',
                            color: 'primary'
                        },
                        cancel: {
                            show: true,
                            label: 'Fechar'
                        }
                    },
                    dismissible: false
                });
            }
        }).catch((error) => {
            console.error('Erro ao verificar a localização:', error);
        });
    }
}
