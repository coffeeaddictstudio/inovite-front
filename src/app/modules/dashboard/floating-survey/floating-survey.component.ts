import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {SurveyService} from '../../survey/survey.service';
import {Survey} from '../../survey/survey.types';
import {Subject, timer} from 'rxjs';
import {finalize, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';
import {Platform} from '@ionic/angular';
import {AppService} from '../../../app.service';

@Component({
    selector: 'dashboard-floating-survey',
    templateUrl: './floating-survey.component.html',
    styleUrls: ['./floating-survey.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFloatingSurveyComponent implements OnInit {
    @Output() closeDialogEvent = new EventEmitter<string>();

    survey: Survey;
    surveys: Survey[];
    user: UserNode;
    answerVoted: number;
    open: boolean = false;
    error: boolean = false;
    saving: boolean = false;
    loading: boolean = false;
    isIos: boolean = false;

    timer: string = '';
    countDown: number = 5200;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _surveyService: SurveyService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
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
    ngOnInit(): void {
        this.getSurveys();

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
     * On get surveys
     */
    getSurveys(): void {
        this._surveyService.getAll()
            .subscribe((surveys) => {
                this.survey = null;
                this.saving = false;
                this.surveys = surveys;

                this.loading = false;

                this.checkVote();

                // Mark for check
                this._changeDetectorRef.markForCheck();

                const now = new Date();
                const end = new Date(this.survey?.closed_at);
                this.countDown = (end.getTime() - now.getTime()) / 1000;

                this.initTime();
            });
    }

    /**
     * Init timer
     */
    initTime(): void {
        timer(1000, 1000)
            .pipe(
                takeWhile(() => this.countDown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countDown -= 1)
            )
            .subscribe(() => {
                const h = Math.floor(this.countDown / 3600);
                const m = Math.floor(this.countDown % 3600 / 60);
                const s = Math.floor(this.countDown % 3600 % 60);

                const hDisplay = h > 0 ? (h < 10 ? '0' + h : h) : '00';
                const mDisplay = m > 0 ? (m < 10 ? '0' + m : m) : '00';
                const sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : '00';

                this.timer = hDisplay + 'h ' + mDisplay + 'm ' + sDisplay + 's';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Check vote
     */
    checkVote(): void {
        const now = new Date();

        this.surveys.forEach((item) => {
            const surveyClosed = new Date(item.closed_at);

            if (
                !item.votes.find(x => x.user_id === this.user.id) &&
                surveyClosed >= now
            ) {
                this.survey = item;

            }
        });
    }

    onVoted(): void {
        this.error = false;

        if (!this.answerVoted) {
            this.error = true;

            // Mark for check
            this._changeDetectorRef.markForCheck();

            return;
        }

        this.saving = true;

        this._surveyService.vote(this.survey.id, this.answerVoted)
            .subscribe(() => {
                this.getSurveys();

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
