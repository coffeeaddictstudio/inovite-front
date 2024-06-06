import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {DocumentManager} from '../../document-manager/document-manager.types';
import {DocumentManagerService} from '../../document-manager/document-manager.service';
import {takeUntil} from 'rxjs/operators';
import {AppService} from '../../../app.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'dashboard-card-document-manager',
    templateUrl: './card-document-manager.component.html',
    styleUrls: ['./card-document-manager.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardCardDocumentManagerComponent implements OnInit
{
    documents: DocumentManager[];
    loading: boolean = true;
    hasPermission: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _documentManagerService: DocumentManagerService,
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
        this.hasPermission = this.appService.hasPermission('document_manager_view');
        if (!this.hasPermission) {
            return;
        }

        this._documentManagerService.getRecent().subscribe(() => this.loading = false, () => this.loading = false);
        this._documentManagerService.documents$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((documents: DocumentManager[]) => {
                // Store the data
                this.documents = documents;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(document: DocumentManager): void
    {
        this.appService.openUrlMobile('https://s3-sa-east-1.amazonaws.com/cipa-visualizador-documentos/' + environment.profile + '/index.html?id=' + document.uuid);
    }
}
