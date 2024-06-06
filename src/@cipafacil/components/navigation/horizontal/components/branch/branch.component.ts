import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatMenu } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CipaFacilHorizontalNavigationComponent } from '@cipafacil/components/navigation/horizontal/horizontal.component';
import { CipaFacilNavigationService } from '@cipafacil/components/navigation/navigation.service';
import { CipaFacilNavigationItem } from '@cipafacil/components/navigation/navigation.types';

@Component({
    selector       : 'cipafacil-horizontal-navigation-branch-item',
    templateUrl    : './branch.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CipaFacilHorizontalNavigationBranchItemComponent implements OnInit, OnDestroy
{
    static ngAcceptInputType_child: BooleanInput;

    @Input() child: boolean = false;
    @Input() item: CipaFacilNavigationItem;
    @Input() name: string;
    @ViewChild('matMenu', {static: true}) matMenu: MatMenu;

    private _cipafacilHorizontalNavigationComponent: CipaFacilHorizontalNavigationComponent;
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
        this._cipafacilHorizontalNavigationComponent = this._cipafacilNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._cipafacilHorizontalNavigationComponent.onRefreshed.pipe(
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
     * Trigger the change detection
     */
    triggerChangeDetection(): void
    {
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
