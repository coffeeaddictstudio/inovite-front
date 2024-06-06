import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { CipaFacilNavigationItem, CipaFacilNavigationService } from '@inovite/components/navigation';
import { CipaFacilMockApiService } from '@inovite/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/navigation/data';
import { contacts } from 'app/mock-api/apps/contacts/data';

@Injectable({
    providedIn: 'root'
})
export class SearchMockApi
{
    private readonly _defaultNavigation: CipaFacilNavigationItem[] = defaultNavigation;
    private readonly _contacts: any[] = contacts;

    /**
     * Constructor
     */
    constructor(
        private _cipafacilMockApiService: CipaFacilMockApiService,
        private _cipafacilNavigationService: CipaFacilNavigationService
    )
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // Get the flat navigation and store it
        const flatNavigation = this._cipafacilNavigationService.getFlatNavigation(this._defaultNavigation);

        // -----------------------------------------------------------------------------------------------------
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------
        this._cipafacilMockApiService
            .onPost('api/common/search')
            .reply(({request}) => {

                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if ( query === '' )
                {
                    return [200, {results: []}];
                }

                // Filter the navigation
                const navigationResults = cloneDeep(flatNavigation).filter((item) => {
                    return (item.title?.toLowerCase().includes(query) || (item.subtitle && item.subtitle.includes(query)));
                });

                // Filter the contacts
                const contactsResults = cloneDeep(this._contacts).filter((user) => {
                    return user.name.toLowerCase().includes(query);
                });

                // Create the results array
                const results = [];

                // If there are navigation results...
                if ( navigationResults.length > 0 )
                {
                    // Normalize the results while marking the found chars
                    navigationResults.forEach((result: any) => {

                        // Normalize
                        result['hint'] = result.link;
                        result['resultType'] = 'page';

                        // Mark the found chars
                        const re = new RegExp('(' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
                        result.title = result.title.replace(re, '<mark>$1</mark>');
                    });

                    // Add the results
                    results.push(...navigationResults);
                }

                // If there are contacts results...
                if ( contactsResults.length > 0 )
                {
                    // Normalize the results while marking the found chars
                    contactsResults.forEach((result) => {

                        // Normalize
                        result.title = result.name;
                        result.resultType = 'contact';

                        // Make the found chars bold
                        const re = new RegExp('(' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
                        result.title = result.title.replace(re, '<mark>$1</mark>');

                        // Add a link
                        result.link = '/apps/contacts/' + result.id;
                    });

                    // Add the results to the results object
                    results.push(...contactsResults);
                }

                // Return the response
                return [200, {results}];
            });
    }
}
