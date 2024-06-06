import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {User, UserNode} from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import {AuthService} from '../../../core/auth/auth.service';
import {Condominium, CondominiumPaginate} from '../../../modules/condominium/condominium.types';
import {CondominiumService} from '../../../modules/condominium/condominium.service';
import {CipaFacilConfirmationService} from '../../../../@inovite/services/confirmation';
import {environment} from '../../../../environments/environment';
import {AppLayoutComponent} from '../../layouts/app/app.component';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'userMenu',
    providers: [AppLayoutComponent]
})
export class UserMenuComponent implements OnInit, OnDestroy
{
    static ngAcceptInputType_showAvatar: BooleanInput;

    @Input() showAvatar: boolean = true;
    @Input() dark: boolean = false;

    user: UserNode;
    condominiums: Condominium[];
    layoutAdmin: boolean = false;
    env = environment;
    enterprise = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _condominiumService: CondominiumService,
        private _cipaFacilConfirmationDialog: CipaFacilConfirmationService,
        public authService: AuthService,
        public appLayoutComponent: AppLayoutComponent
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
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserNode) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign out
     */
    signOut(): void
    {
        this.authService.signOut()
            .subscribe(() => {
                window.location.reload();
            });
    }

    /**
     * Change company
     */
}
