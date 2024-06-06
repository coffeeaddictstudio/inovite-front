import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { CipaFacilConfirmationService } from '../../services/confirmation';
import { AppService } from '../../../app/app.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { CipaFacilAlertType } from '../alert';

@Component({
    selector: 'cipafacil-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'cipafacilFileUploader'
})
export class CipaFacilFileUploaderComponent implements OnInit {

    @Input() module: string;
    @Input() multiple: boolean;
    @Input() file: File;
    @Input() files: File[];
    @Input() extensions: string = 'image/jpeg,image/jpg,image/png';

    @Output() readonly fileUploaded: EventEmitter<any> = new EventEmitter<any>();
    @Output() readonly removeFile: EventEmitter<any> = new EventEmitter<any>();

    env = environment;
    gallery: boolean = false;
    events: number = 0;
    uploading: boolean = false;
    progress: number;
    uploadError: number = 0;

    /**
     * Constructor
     */
    constructor(
        private _dialogsService: CipaFacilConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _camera: Camera,
        private _actionSheet: ActionSheetController,
        private _platform: Platform,
        private _cipaFacilConfirmationDialog: CipaFacilConfirmationService,
        public appService: AppService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    formatTitle(): string {
        const extensions = this.extensions.split(',').map((extension) => {
            const ext = extension.trim().split('/')[1].toUpperCase();
            return ext;
        });

        const formattedExtensions = extensions.join(', ');
        const fileSizeInMB = (this.env.sizeFiles / (1000 * 1000)).toFixed(0);

        return `${formattedExtensions} até ${fileSizeInMB}Mb`;
    }

    /**
     * On upload file
     *
     * @param event
     */
    onSelect(event): void {
        let message = 'O arquivo ultrapassou o tamanho máximo permitido de 20mb';

        // Check if any image was rejected
        if (event.rejectedFiles.length) {

            if (!this.multiple) {
                if (event.rejectedFiles[0].reason === 'type') {
                    message = 'Tipo de arquivo não suportado';
                }

                if (event.rejectedFiles[0].reason === 'size') {
                    message = 'O arquivo ultrapassou o tamanho máximo permitido de 20mb';
                }

                if (event.rejectedFiles[0].reason === 'no_multiple') {
                    message = 'Selecione apenas um arquivo';
                }
            }


            if (this.multiple) {
                event.rejectedFiles.find(f => {
                    if (f.reason === 'type') {
                        message = 'Um ou mais arquivos possuem um tipo não suportado';
                    }

                    if (f.reason === 'size') {
                        message = 'Um ou mais arquivos ultrapassaram o tamanho máximo permitido de 20mb';
                    }
                });
            }


            this._dialogsService.open({
                title: 'Opps!',
                message,
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'info'
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Ok',
                        color: 'primary'
                    },
                    cancel: {
                        show: false,
                        label: 'Cancelar'
                    }
                },
                dismissible: true
            });

            return;
        }

        event.addedFiles.forEach((file) => {

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // upload file
            this.appService.upload(file, this.module)
                .subscribe((response: HttpEvent<any>) => {
                    switch (response.type) {
                        case HttpEventType.Sent:
                            this.uploading = true;
                            console.log('Request has been made!');
                            break;
                        case HttpEventType.ResponseHeader:
                            console.log('Response header has been received!');
                            break;
                        case HttpEventType.UploadProgress:
                            this.progress = Math.round(response.loaded / response.total * 100);
                            console.log(`Uploaded! ${this.progress}%`);
                            break;
                        case HttpEventType.Response:
                            file.url = response.body.key;

                            if (!this.multiple) {
                                this.file = file;
                                this.fileUploaded.emit(this.file);

                                // Mark for check
                                this._changeDetectorRef.markForCheck();
                            }

                            if (this.multiple) {
                                this.fileUploaded.emit(file);

                                // Mark for check
                                this._changeDetectorRef.markForCheck();
                            }

                            this.uploading = false;
                            setTimeout(() => {
                                this.progress = 0;
                            }, 1500);
                    }

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }, (err) => {
                    if (err) {
                        this.uploadError++;

                        if (this.uploadError > 0) {
                            this.onUploadError();
                        }

                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    }

                });
        });
    }

    /**
     * On upload error
     */
    onUploadError(): void {
        this._cipaFacilConfirmationDialog.open({
            title: 'Não foi possível carregar o arquivo, por favor tente novamente.',
            message: '',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
            },
            actions: {
                confirm: {
                    show: false,
                    label: 'Confirmar',
                },
                cancel: {
                    show: true,
                    label: 'Fechar'
                }
            },
            dismissible: false
        }).afterClosed()
            .subscribe((action) => {
                this.file = null;
                this.uploading = false;
                this.uploadError = 0;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On mobile select
     * @param event
     */
    async onMobileSelect(event): Promise<any> {
        if (this.gallery) {
            this.gallery = false;
            return;
        }

        if (this._platform.is('cordova')) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            return;
        }

        if (!event.isTrusted) {
            return;
        }

        const actionSheet = await this._actionSheet.create({
            id: 'action-sheet',
            header: 'Upload Imagem',
            buttons: [
                {
                    text: 'Galeria',
                    icon: 'image',
                    handler: () => {
                        this.gallery = true;
                        event.target.dispatchEvent(event);
                        actionSheet.dismiss();
                    }
                },
                {
                    text: 'Câmera',
                    icon: 'camera',
                    handler: async () => {
                        await this.onCameraShot();
                    }
                },
                {
                    text: 'Fechar',
                    icon: 'close-outline',
                    role: 'cancel',
                    handler: async () => {
                        this.events = 0;
                    }
                }
            ],
        });
        await actionSheet.present();

        // if (!this._platform.is('cordova') || this.gallery || this.events > 0) {
        //     this.gallery = false;
        //     return;
        // }
        //
        // this.events++;
        //
        // event.preventDefault();
        // event.stopPropagation();
        //
        // const actionSheet = await this._actionSheet.create({
        //     id: 'action-sheet',
        //     header: 'Upload Imagem',
        //     buttons: [
        //         {
        //             text: 'Galeria',
        //             icon: 'image',
        //             handler: () => {
        //                 this.gallery = true;
        //                 event.target.dispatchEvent(event);
        //                 actionSheet.dismiss();
        //                 this.events = 0;
        //             }
        //         },
        //         {
        //             text: 'Câmera',
        //             icon: 'camera',
        //             handler: async () => {
        //                 this.events = 0;
        //                 await this.onCameraShot();
        //             }
        //         },
        //         {
        //             text: 'Fechar',
        //             icon: 'close-outline',
        //             role: 'cancel',
        //             handler: async () => {
        //                 this.events = 0;
        //             }
        //         }
        //     ],
        // });
        // await actionSheet.present();
    }

    async onCameraShot(): Promise<any> {
        this._camera.getPicture({
            quality: 100,
            destinationType: this._camera.DestinationType.DATA_URL,
            encodingType: this._camera.EncodingType.JPEG,
            mediaType: this._camera.MediaType.PICTURE,
            correctOrientation: true
        }).then(async (base64) => {
            const base64Image = 'data:image/jpeg;base64,' + base64;

            fetch(base64Image)
                .then(res => res.blob())
                .then(async blob => {

                    const event: NgxDropzoneChangeEvent = {
                        addedFiles: [blob as File],
                        rejectedFiles: [],
                        source: null
                    };

                    return this.onSelect(event);
                });
        });
    }

    /**
     * On remove file
     *
     */
    onRemove(index?: number): void {
        if (!this.multiple) {
            this.file = null;
            this.removeFile.emit();
        } else {
            this.removeFile.emit(this.files[index]);
            this.files.splice(index, 1);
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();

    }
}
