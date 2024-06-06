import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NoticeBoardService} from '../../../modules/notice-board/notice-board.service';
import {NoticeBoard} from '../../../modules/notice-board/notice-board.types';

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, OnDestroy
{
    notices: NoticeBoard[];
    index: number = 0;
    run;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _noticeBoardService: NoticeBoardService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
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
        this._noticeBoardService.getAll().subscribe();
        this._noticeBoardService.notices$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notices: NoticeBoard[]) => {
                this.notices = notices;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.carouselChange();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        clearTimeout(this.run);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change carrousel in interval 8 sec
     */
    carouselChange(): void
    {
        this.run = setTimeout(() => {
            if (this.index >= this.notices.length - 1) {
                this.index = 0;
            }

            this.next();
            this.carouselChange();
        }, 6000);
    }

    next(): void
    {
        if (this.index >= this.notices.length - 1) {
            return;
        }

        this.index++;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    previous(): void
    {
        if (this.index <= 0) {
            return;
        }

        this.index--;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    redirect(): void
    {
        this._router.navigateByUrl('/mural-de-avisos');
    }

}
