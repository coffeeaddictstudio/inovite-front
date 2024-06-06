import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AppService} from '../../../app.service';

@Component({
    selector: 'quick-access',
    templateUrl: './quick-access.component.html',
    styleUrls: ['./quick-access.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickAccessComponent implements OnInit
{
    @Input() position: 'top' | 'middle' = 'top';

    user: UserNode;

    menu: any = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _userService: UserService,
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

        this.checkQuickAccessPermissions();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /** Check quick access permissions
     *
     */
    checkQuickAccessPermissions(): void {
        this.menu.push({
            name: 'Dash Comercial',
            icon: 'paper-plane',
            link: '/dashboard/dashboard-commercial'
        });
        this.menu.push({
            name: 'Dash Fornecedores',
            icon: 'accounting',
            link: '/dashboard/dashboard-suppliers'
        });
        this.menu.push({
            name: 'Dash Promocional',
            icon: 'growth',
            link: '/dashboard/dashboard-promotional'
        });
        this.menu.push({
            name: 'Cadastro de Fornecedores',
            icon: 'file-settings',
            link: '/dashboard/supplier-registration'
        });
    }
}
