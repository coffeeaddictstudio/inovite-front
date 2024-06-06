import {Injectable} from '@angular/core';
import {cloneDeep} from 'lodash-es';
import {CipaFacilNavigationItem} from '@inovite/components/navigation';
import {CipaFacilMockApiService} from '@inovite/lib/mock-api';
import {defaultNavigation, horizontalNavigation, verticalNavigation} from 'app/mock-api/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi {
    private readonly _defaultNavigation: CipaFacilNavigationItem[] = defaultNavigation;
    private readonly _verticalNavigation: CipaFacilNavigationItem[] = verticalNavigation;
    private readonly _horizontalNavigation: CipaFacilNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _cipafacilMockApiService: CipaFacilMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._cipafacilMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if (defaultNavItem.id === horizontalNavItem.id) {
                            horizontalNavItem.title = defaultNavItem.title;
                            horizontalNavItem.icon = defaultNavItem.icon;
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill vertical navigation children using the default navigation
                this._verticalNavigation.forEach((verticalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if (defaultNavItem.id === verticalNavItem.id) {
                            verticalNavItem.title = defaultNavItem.title;
                            verticalNavItem.icon = defaultNavItem.icon;
                            verticalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                console.log(cloneDeep(this._verticalNavigation));

                // Return the response
                return [
                    200,
                    {
                        default: cloneDeep(this._defaultNavigation),
                        vertical: cloneDeep(this._verticalNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
