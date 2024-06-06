import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, take, tap, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Condominium, CondominiumPaginate, CondominiumStorage} from './condominium.types';
import {UserService} from '../../core/user/user.service';
import {Inventory} from "../inventory/inventory.types";

@Injectable({
    providedIn: 'root'
})
export class CondominiumService
{
    private _condominium: BehaviorSubject<Condominium | null> = new BehaviorSubject(null);
    private _condominiums: BehaviorSubject<Condominium[] | null> = new BehaviorSubject([]);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for condominium storage
     */
    get condominium(): CondominiumStorage {
        return JSON.parse(localStorage.getItem('condominium')) ?? '';
    }

    /**
     * Getter for condominium selected
     */
    get condominiumSelected(): number {
        return parseInt(localStorage.getItem('condominium_code'), 10) ?? null;
    }

    /**
     * Getter for condominium
     */
    get condominium$(): Observable<Condominium>
    {
        return this._condominium.asObservable();
    }

    /**
     * Getter for condominiums
     */
    get condominiums$(): Observable<Condominium[]>
    {
        return this._condominiums.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all condominiums
     */
    getAll(search: string = ''): Observable<Condominium[]>
    {
        return this._httpClient.get<Condominium[]>(`${environment.api}/enterprise/findAll?search=${search}`, {
            reportProgress: true
        }).pipe(
            tap((condominiums) => {

                // Return condominium
                return condominiums;
            })
        );
    }

    /**
     * Get condominium by id
     */
    getCondominiumById(condominiumId: number): Observable<Condominium>
    {
        return this._httpClient.get<Condominium>(`${environment.api}/enterprises/${condominiumId}`, {
            reportProgress: true
        }).pipe(
            tap((condominium: Condominium) => {

                // Return condominium
                return condominium;
            })
        );
    }

    /**
     * Update condominium selected
     *
     * @param id
     */
    select(id: number): Observable<any>
    {
        return this._httpClient.post<any>(`${environment.api}/enterprise/select`, {id}, {reportProgress: true}).pipe(
            map((response) => {
                // Return the response
                return response;
            })
        );
    }
    createEnterprise(body: any): Observable<any>
    {
        return this._httpClient.post<any>(`${environment.api}/enterprise`, body, {
            reportProgress: true,
        }).pipe(
            tap((response) => {
                this.getAll();

            })
        );
    }

    /*createInventoryItem(body: Inventory): Observable<Inventory>
    {
        return this._httpClient.post<Inventory>(`${environment.api}/inventory`, body, {
            reportProgress: true,
        }).pipe(
            tap((inventoryItem: Inventory) => {
                // Update Inventory Items
                this._inventoryItems.next([...this._inventoryItems.value, inventoryItem]);

                // Return Item
                return inventoryItem;
            })
        );
    }*/
}
