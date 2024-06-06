import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardService
{
    private _isDashboard: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter and setter for showCarousel
     */
    get isDashboard$(): Observable<boolean>
    {
        return this._isDashboard.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the carousel
     */
    show(): void
    {
        this._isDashboard.next(true);
    }

    /**
     * Hide the carousel
     */
    hide(): void
    {
        this._isDashboard.next(false);
    }

    /**
     * Send motoboy request
     *
     * @param date
     */
    sendRequest(date): Observable<any> {
        return this._httpClient.post<any>(`${environment.api}/motoboy`, {expected_date: date}, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }

    /**
     * Find on Consultor
     *
     */
    findConsultor(): Observable<any> {
        return this._httpClient.get<any>(`${environment.api}/condominiums/consultor`, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }

    /**
     * Find on Preposto
     *
     */
    findPreposto(): Observable<any> {
        return this._httpClient.get<any>(`${environment.api}/condominiums/preposto`, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }

    /**
     * Get service order charts info
     *
     * @param startDate
     * @param endDate
     */
    getServiceOrderChartInfo(startDate?: string, endDate?: string): Observable<any> {
        return this._httpClient.get<any>(`${environment.api}/service-order/dashboard${startDate ? `?start_date=${startDate}` : ''}${endDate ? `&end_date=${endDate}` : ''}`, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }

    /**
     * Get task charts info
     *
     * @param startDate
     * @param endDate
     */
    getTaskChartInfo(startDate?: string, endDate?: string): Observable<any> {
        return this._httpClient.get<any>(`${environment.api}/tasks/dashboard${startDate ? `?start_date=${startDate}` : ''}${endDate ? `&end_date=${endDate}` : ''}`, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }

    getLoja(): Observable<any> {
        return this._httpClient.get<any>(`${environment.api}/loja`, {
            reportProgress: true,
        }).pipe(
            tap((response: any) => {
                // Return response
                return response;
            })
        );
    }
}
