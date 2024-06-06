import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CipaFacilVerticalNavigationComponent } from '@cipafacil/components/navigation/vertical/vertical.component';
import { CipaFacilNavigationService } from '@cipafacil/components/navigation/navigation.service';
import { CipaFacilNavigationItem } from '@cipafacil/components/navigation/navigation.types';

@Component({
    selector       : 'cipafacil-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CipaFacilVerticalNavigationGroupItemComponent implements OnInit, OnDestroy
{
    static ngAcceptInputType_autoCollapse: BooleanInput;

    @Input() autoCollapse: boolean;
    @Input() item: CipaFacilNavigationItem;
    @Input() name: string;

    private _cipafacilVerticalNavigationComponent: CipaFacilVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cipafacilNavigationService: CipaFacilNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._cipafacilVerticalNavigationComponent = this._cipafacilNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._cipafacilVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
