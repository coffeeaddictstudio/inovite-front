import { NgModule } from '@angular/core';
import { CipaFacilMediaWatcherService } from '@cipafacil/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        CipaFacilMediaWatcherService
    ]
})
export class CipaFacilMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _cipafacilMediaWatcherService: CipaFacilMediaWatcherService)
    {
    }
}
