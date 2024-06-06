import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CondominiumService} from '../condominium.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Condominium} from '../condominium.types';
import {Router} from '@angular/router';
import {AppLayoutComponent} from '../../../layout/layouts/app/app.component';
import {DialogsService} from '../../../layout/common/dialogs/dialogs.service';
import {UserService} from '../../../core/user/user.service';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserNode} from '../../../core/user/user.model';
import {AppService} from '../../../app.service';
import {MatDialog} from "@angular/material/dialog";
import {FormEnterpriseComponent} from "../form-enterprise/form-enterprise.component";

@Component({
    selector: 'condominium-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class CondominiumListComponent implements OnInit, OnDestroy
{
    user: UserNode;
    condominiums: Condominium[];

    loading: boolean = true;
    redirect: boolean = false;

    currentPage: number = 1;
    totalItems: number = 1;
    filterField: string = '';
    searchControl: FormControl = new FormControl('');

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _condominiumService: CondominiumService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _dialog: MatDialog,
        private _appLayoutComponent: AppLayoutComponent,
        private _userService: UserService
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
        // Get the condominium list
        this._condominiumService.getAll()
            .subscribe((condominiums) => {
                this.condominiums = condominiums;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.searchControl.valueChanges.subscribe((change) => {
            if (change.length === 0) {
                this.onSearch();
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Select and redirect condominium
     *
     * @param condominium
     */
    selectCondominium(condominium: Condominium): void
    {
        // Set condominium in localStorage
        localStorage.setItem('enterprise', JSON.stringify(condominium));

        console.log(localStorage.getItem('enterprise'));

        this._router.navigate(['/dashboard']);

        this._condominiumService.select(condominium.id)
            .subscribe(() => {
                // Update user
                this._userService.getMe()
                    .subscribe(() => {

                        // Redirect user by dashboard
                        this._router.navigateByUrl('/dashboard')
                            .then(() => {
                                this._appLayoutComponent.hasCondominium = true;

                                // Mark for check
                                this._changeDetectorRef.markForCheck();
                            });
                });
            });
    }

    onSearch(): void
    {
        const search = this.searchControl.value;
        this._condominiumService.getAll(search)
            .subscribe((paginate) => {
                this.condominiums = paginate;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    create(): void{
        const refValidate = this._dialog.open(FormEnterpriseComponent, {
            panelClass: ['h-auto'],
            data: {
            }
        });
    }
}
