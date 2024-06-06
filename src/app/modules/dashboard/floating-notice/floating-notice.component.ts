import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Platform} from '@ionic/angular';
import {AssemblyService} from '../../assembly/assembly.service';
import {MatDialog} from '@angular/material/dialog';
import {NoticeDialogComponent} from './dialog/dialog.component';
import {Assembly} from '../../assembly/assembly.types';
import {CipaFacilConfirmationService} from '../../../../@inovite/services/confirmation';

@Component({
    selector: 'dashboard-floating-notice',
    templateUrl: './floating-notice.component.html',
    styleUrls: ['./floating-notice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFloatingNoticeComponent implements OnInit {
    @Output() closeDialogEvent = new EventEmitter<string>();

    assembly: Assembly = null;
    totalNotices: number = 0;
    user: UserNode;

    open: boolean = false;
    error: boolean = false;
    saving: boolean = false;
    loading: boolean = false;
    isIos: boolean = false;


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _assemblyService: AssemblyService,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _platform: Platform,
        private _dialogService: CipaFacilConfirmationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getPendingNotice();

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserNode) => {
                this.user = user;
            });

        this._platform.ready()
            .then(() => {
                if (this._platform.is('iphone') || this._platform.is('ios')) {
                    this.isIos = true;

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On get pending notice
     */
    getPendingNotice(): void {
        this._assemblyService.getPendingAssemblyApprovals()
            .subscribe((response) => {
                if (response) {
                    this.assembly = response.assembly;
                    this.totalNotices = response.totalNotices;
                }

                this.loading = false;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On open dialog
     */
    openNoticeDialog(): void {
        this._matDialog.open(NoticeDialogComponent, {
            width: '100vw',
            data: this.assembly
        }).afterClosed().subscribe({
            next: ({close, status}) => {
                console.log(close);
                if (close) {
                    this.getPendingNotice();

                    this._dialogService.open({
                        title: status === 'approved' ? 'Aprovado!' : 'Reprovado!',
                        message: status === 'approved' ? 'Edital aprovado com sucesso!' : 'Edital rejeitado com sucesso!',
                        icon: {
                            show: true,
                            name: status === 'approved' ? 'heroicons_outline:check' : 'heroicons_outline:x',
                            color: 'primary'
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
                }
            }
        });
    }

    /**
     * On close dialog
     */
    closeDialog(): void {
        this.closeDialogEvent.emit('');
    }
}
