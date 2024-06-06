import { Injectable } from '@angular/core';
import { CipaFacilDrawerComponent } from '@cipafacil/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class CipaFacilDrawerService
{
    private _componentRegistry: Map<string, CipaFacilDrawerComponent> = new Map<string, CipaFacilDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: CipaFacilDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): CipaFacilDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
