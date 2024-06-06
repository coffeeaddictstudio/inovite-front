import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Boleto} from '../../boleto/boleto.types';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BoletoListComponent} from '../../boleto/list/list.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppService} from '../../../app.service';
import {BoletoService} from '../../boleto/boleto.service';

@Component({
    selector: 'dashboard-card-boleto',
    templateUrl: './card-boleto.component.html',
    styleUrls: ['./card-boleto.component.scss'],
    providers: [MatSnackBar]
})
export class DashboardCardBoletoComponent implements OnInit, OnDestroy
{
    boletos: Boleto[];
    dueDate: Date;
    hasPermission: boolean = false;
    loading: boolean = true;
    index: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _boletoService: BoletoService,
        public boletoComponent: BoletoListComponent,
        public appService: AppService,
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
        this.loading = true;
        this.hasPermission = this.appService.hasPermission('boleto_view');
        if (!this.hasPermission) {
            return;
        }

        this._boletoService.getAll()
            .subscribe((boletos) => {
                this.loading = false;
                if (!boletos.historicos.length) {
                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                    return;
                }
                this.boletos = boletos.historicos;

                // Format dueDate to Date type
                this.boletos.forEach(b => {
                    const boletoDueDate = b.dataVencimento.split('/');
                    Object.assign(b, {
                        dueDate: new Date(parseInt(boletoDueDate[2], 10), parseInt(boletoDueDate[1], 10) - 1, parseInt(boletoDueDate[0], 10))
                    });
                });

                // Order boletos by status
                this.boletos.sort((a) => {
                    if (a.status === 'Emitido') {
                        return -1;
                    }
                    return 1;
                });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, () => {
                this.loading = false;
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Next boleto on carousel
     */
    next(): void
    {
        if (this.index >= this.boletos.length - 1) {
            return;
        }

        this.index++;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Previous boleto on carousel
     */
    previous(): void
    {
        if (this.index <= 0) {
            return;
        }

        this.index--;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
