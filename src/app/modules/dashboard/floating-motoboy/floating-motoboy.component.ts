import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Platform} from '@ionic/angular';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'dashboard-floating-motoboy',
    templateUrl: './floating-motoboy.component.html',
    styleUrls: ['./floating-motoboy.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFloatingMotoboyComponent implements OnInit {

    @Output() closeDialogEvent = new EventEmitter<string>();

    user: UserNode;
    loading: boolean = false;
    isIos: boolean = false;
    sent: boolean = false;

    requestedDate: Date = new Date();
    minimumDate: Date = new Date();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _platform: Platform,
        private _dashboardService: DashboardService
    ) {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);

        if (tomorrow.getDay() === 6) {
            this.requestedDate.setDate(now.getDate() + 3);
        } else if (tomorrow.getDay() === 0) {
            this.requestedDate.setDate(now.getDate() + 2);
        } else {
            this.requestedDate.setDate(now.getDate() + 1);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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

    weekendsDatesFilter(d?: Date): boolean
    {
        const now = new Date();

        if (d) {
            const day = d.getDay();

            /* Prevent Saturday and Sunday for select. */
            return day !== 0 && day !== 6 && (now.getDate() !== d.getDate());
        }
    }

    onSendRequest(): void {
        this.loading = true;
        this._dashboardService.sendRequest(this.requestedDate).subscribe((date) => {
            this.sent = true;
            this.loading = false;
            // Mark for check
            this._changeDetectorRef.markForCheck();

        });
    }

    /**
     * On close dialog
     */
    closeDialog(): void {
        this.closeDialogEvent.emit('');
    }
}
