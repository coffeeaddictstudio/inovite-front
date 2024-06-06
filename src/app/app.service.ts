import {Component, Injectable, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Bank, Module, Navigation, Permission, Role} from './app.types';
import {environment} from '../environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {UserService} from './core/user/user.service';
import {UserNode} from './core/user/user.model';
import {CipaFacilConfirmationService} from '../@inovite/services/confirmation';
import {Router} from '@angular/router';
import {AuthService} from './core/auth/auth.service';
import {Platform} from '@ionic/angular';
import {File} from '@awesome-cordova-plugins/file';
import {FileOpener} from '@awesome-cordova-plugins/file-opener';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import * as pdfjsLib from 'pdfjs-dist';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import * as _moment from 'moment';
import * as moment from 'moment-timezone';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

declare var cordova: any;

@Component({
    template: `

    `,
    providers: [
        InAppBrowser
    ]
})

@Injectable({
    providedIn: 'root',
})

// tslint:disable-next-line:component-class-suffix
export class AppService
{
    private _role: BehaviorSubject<Role | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject([]);
    private _modules: BehaviorSubject<Module[] | null> = new BehaviorSubject([]);
    private _banks: BehaviorSubject<Bank[] | null> = new BehaviorSubject([]);
    private _user: UserNode;
    private _androidPermissions: AndroidPermissions;
    private appService: any;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _cipaFacilConfirmationDialog: CipaFacilConfirmationService,
        private _router: Router,
        private _authService: AuthService,
        private _platform: Platform,
    ) {
        this._userService.user$
            .subscribe((user) => this._user = user);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for roles
     */
    get roles$(): Observable<Role[]> {
        return this._roles.asObservable();
    }

    set roles(value: Role[]) {
        this._roles.next(value);
    }

    /**
     * Getter for modules
     */
    get modules$(): Observable<Module[]> {
        return this._modules.asObservable();
    }

    /**
     * Getter for banks
     */
    get banks$(): Observable<Bank[]> {
        return this._banks.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all roles
     */
    getRoles(): Observable<Role[]> {
        return this._httpClient.get<Role[]>(`${environment.api}/roles`, {reportProgress: true}).pipe(
            tap((roles: Role[]) => {
                // Update roles
                this._roles.next(roles);

                // Return roles
                return roles;
            })
        );
    }

    getRole(id: number): Observable<Role> {
        return this._httpClient.get<Role>(`${environment.api}/roles/${id}`, {reportProgress: true}).pipe(
            tap((role: Role) => {
                // Update role
                this._role.next(role);

                // Return roles
                return role;
            })
        );
    }

    /**
     * Get all modules
     */
    getModules(): Observable<Module[]> {
        return this._httpClient.get<Module[]>(`${environment.api}/modules`, {reportProgress: true}).pipe(
            tap((modules: Module[]) => {
                // Update modules
                this._modules.next(modules);

                // Return modules
                return modules;
            })
        );
    }

    /**
     * Get all banks
     */
    getBanks(): Observable<Bank[]> {
        return this._httpClient.get<Bank[]>(`${environment.api}/banks`, {reportProgress: true}).pipe(
            tap((banks: Bank[]) => {
                // Update banks
                this._banks.next(banks);

                // Return banks
                return banks;
            })
        );
    }




    /**
     * Export object to xlsx
     *
     * @param json
     * @param fileName
     * @param format
     */
    async exportAsFile(json: any[], fileName: string, format: 'xlsx' | 'csv' | 'txt' = 'xlsx'): Promise <void> {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
        const excelBuffer: any = XLSX.write(workbook, {bookType: format, type: 'array'});
        const data: Blob = new Blob([excelBuffer]);
        const url = window.URL.createObjectURL(data);

        console.log('#######################' + fileName);
        this._platform.ready()
                .then(async () => {
                    if (this._platform.is('cordova')) {
                        await File.writeFile(
                            File.externalRootDirectory + '/Download/',
                            fileName,
                            data,
                            {
                                replace: true
                            }
                        );
                        console.log('#######################' + File.externalRootDirectory + '/Download/' + fileName);
                        await FileOpener.open(File.externalRootDirectory + '/Download/' + fileName, 'application/vnd.ms-excel');
                        console.log('#######################' + 'passou');

                    } else {
                        console.log('#######################' + 'passou1');
                        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.' + format);
                    }
                });
    }

    hasPermission(code: string, dialog: boolean = false): boolean {
        return true;

        const has = this._user.role.permissions.find(x => x.code === code) !== undefined;
        if (!has && dialog) {
            this._cipaFacilConfirmationDialog.open({
                id: 'dialog-unauthorized',
                title: 'Desculpe :(',
                message: 'Você não possui permissão para acessar essa funcionalidade!',
                icon: {
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn'
                },
                actions: {
                    confirm: {
                        show: true,
                        label: 'Ir para dashboard',
                        color: 'warn'
                    },
                    cancel: {
                        show: false,
                        label: 'Ir para dashboard'
                    }
                },
                dismissible: false
            })
                .afterClosed()
                .subscribe(() => {
                    return this._router.navigateByUrl('/dashboard');
                });
        }

        return has;
    }

    /**
     * Download file
     *
     * @param buffer
     * @param type
     * @param name
     */
    async downloadFile(buffer: any, type: string, name: string): Promise<any>
    {
        if (this._platform.is('cordova')) {
            const path = cordova.file.externalDataDirectory;
            File.writeFile(path, name, buffer, {replace: true})
                .then((entry) => {
                    FileOpener.open(entry.nativeURL, type)
                        .then(() => console.log('open'))
                        .catch(() => console.log('error open'));
                });
        } else {
            const blob = new Blob([buffer], {type});
            const url = window.URL.createObjectURL(blob);
            FileSaver.saveAs(url, name);
        }
    }

    async downloadFileBase64(base64: string, type: string, name: string): Promise<any>
    {
        if (this._platform.is('cordova')) {
            fetch(base64)
                .then(res => res.arrayBuffer())
                .then(buff => this.downloadFile(buff, type, name));
        } else {
            const a = document.createElement('a');
            a.href = base64;
            a.download = name;
            a.click();
        }
    }

    upload(file: File, module: string = ''): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('module', module);

        return this._httpClient.post<any>(`${environment.api}/uploads`, formData, {
            reportProgress: true,
            observe: 'events',
        }).pipe(
            tap((fileKey) => {
                return fileKey;
            })
        );
    }

    generateFileUrl(key: string, bucket?: string): string
    {
        if (key.includes('https://')) {
            return key;
        }

        let url = environment.api + '/uploads/signed?key=' + key + '&token=';
        if (bucket) {
            url += '&bucket=' + bucket;
        }

        return url;
    }
    /**
     * Quando for link externo utilizar essa função para download passando com referência a url
     */

    async openUrlMobile(url: string): Promise<any>
    {
        if (this._platform.is('cordova')) {
            const browser = new InAppBrowser().create(url, '_system');
            browser.show();
        }else {
            window.open(url, '_blank');
        }
    }

    convertDataUrlToFile = (dataUrl, filename) => {
        return fetch(dataUrl)
            .then(res => res.arrayBuffer())
            .then(buf => new Blob([buf], { type: 'image/jpeg' }));
    }

    convertFiletoDataUrl = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    })

    convertPdfPageToImage = (pdf, pageNumber, fileName) => new Promise(resolve => {
        pdf.getPage(pageNumber).then(page => {
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const renderContext = { canvasContext: ctx, viewport: viewport };

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render(renderContext).promise.then(() => {
                const dataUrl = canvas.toDataURL();
                this.convertDataUrlToFile(dataUrl, `${fileName}-${pageNumber}.jpeg`)
                    .then((file) => {
                        resolve(file);
                    });
            });
        });
    })

    convertPdfFileToImages = (file) => new Promise(resolve => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
        const worker = new pdfjsLib.PDFWorker();

        if (file.type === 'application/pdf') {
            this.convertFiletoDataUrl(file).then(dataUrl => {

                pdfjsLib.getDocument( {url: dataUrl, worker}).promise.then(pdf => {
                    const promises = Array.from(Array(pdf.numPages), (_, index) => new Promise(resolve => {
                        const pageNumber = index + 1;
                        this.convertPdfPageToImage(pdf, pageNumber, file.name).then(resolve);
                    }));
                    Promise.all(promises).then(resolve);
                });
            });
        } else {
            resolve(file);
        }
    })

    getOccupationMap(type: string): string
    {
        const map = {
            'admin': 'ADMIN_CIPA',
            'sindico': 'SINDICO',
            'condomino': 'CONDOMINO',
            'funcionario': 'CONDOMINO',
            'conselheiro': 'CONSELHEIRO',
            'inquilino': 'INQUILINO',
            'subsindico': 'SINDICO',
            'concierge': 'CONCIERGE',
            'advogado': 'ADVOGADO',
            'consultor': 'ADMIN_CIPA',
            'assessor': 'ASSESSOR',
            'outros': 'CONDOMINO',
            'preposto': 'SINDICO',
            'administradora': 'CONDOMINO',
            'administrador': 'ADMINISTRADOR',
            'morador': 'CONDOMINO',
            'gestor-operacional': 'SINDICO',
        };

        return map[type] ? map[type] : 'undefined';
    }

    monthNameToNumber(name: string): number
    {
        const map = {
            'Jan': 1,
            'Fev': 2,
            'Mar': 3,
            'Abr': 4,
            'Mai': 5,
            'Jun': 6,
            'Jul': 7,
            'Ago': 8,
            'Set': 9,
            'Out': 10,
            'Nov': 11,
            'Dez': 12,
        };

        return map[name] ? map[name] : 0;
    }

    getNameInitials(name: string): string
    {
        if (!name) {
            return name;
        }

        const names = name.trim().split(' ');
        return names.length > 1 ? (names[0][0] + '' + names[names.length - 1][0]).toUpperCase() : name[0].toUpperCase();
    }

    /**
     * Convert two dates into a readable string for elapsed time
     *
     * @description Get two dates, calculate the difference in seconds between them and converts them into a readable string
     * @example há 3 dias atrás
     * @param targetDate
     * @param currentDate
     */
    getElapsedTime(targetDate: Date, currentDate: Date): string {
        const ONE_MINUTE_IN_SECONDS = 60;
        const ONE_HOUR_IN_SECONDS = 3600;
        const ONE_DAY_IN_SECONDS = 82800;

        let elapsedTimeString = 'Última atualização ';
        let elapsedTime = _moment(currentDate).diff(targetDate, 'seconds');

        // Updated in less than a minute ago
        if (elapsedTime < ONE_MINUTE_IN_SECONDS) {
            elapsedTimeString += 'há poucos segundos atrás';
        }

        // Update between 1 minute and 59 minutes
        if (elapsedTime > ONE_MINUTE_IN_SECONDS && elapsedTime < ONE_HOUR_IN_SECONDS) {
            elapsedTime = Math.floor((elapsedTime / ONE_MINUTE_IN_SECONDS));
            elapsedTimeString += `há ${elapsedTime} ${elapsedTime === 1 ? 'minuto' : 'minutos'} atrás`;
        }

        // Updated between 1 hour and 23 hours
        if (elapsedTime > ONE_HOUR_IN_SECONDS && elapsedTime < ONE_DAY_IN_SECONDS) {
            elapsedTime = Math.floor((elapsedTime / ONE_HOUR_IN_SECONDS));
            elapsedTimeString += `há ${(elapsedTime)} ${elapsedTime === 1 ? 'hora' : 'horas'} atrás`;
        }

        // Updated after 1 day
        if (elapsedTime > ONE_DAY_IN_SECONDS) {
            elapsedTime = Math.floor((elapsedTime / ONE_DAY_IN_SECONDS));
            elapsedTimeString += `há ${(elapsedTime)} ${elapsedTime === 1 ? 'dia' : 'dias'} atrás`;
        }

        return elapsedTimeString;
    }

    /**
     * Convert date into a readable string
     *
     * @description Convert date into a readable string and returns it. If current date is greater than target date it returns 'Vencida'.
     * @example Hoje, Amanhã, Esta semana, 01/05/2023, Vencida
     * @param id Date
     * @param targetDate Date
     */
    convertDateIntoReadableString(targetDate: Date | string, id?: number): string
    {
        const date = moment.tz(targetDate, 'America/Sao_Paulo').set({hour: 9, minute: 0, second: 0});
        const now = moment.tz('America/Sao_Paulo').set({hour: 9, minute: 0, second: 0});

        if (date.format('YYYY-MM-DD') < now.format('YYYY-MM-DD')) {
            return 'Vencida';
        } else if (date.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')) {
            return 'Hoje';
        } else if (date.format('YYYY-MM-DD') === now.add(1, 'day').format('YYYY-MM-DD')) {
            return 'Amanhã';
        } else if (date.format('YYYY-MM-DD') <= now.endOf('week').format('YYYY-MM-DD')) {
            return 'Essa semana';
        } else {
            return date.format('DD/MM/YYYY');
        }
    }
}
