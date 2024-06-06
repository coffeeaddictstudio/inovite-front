import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import {AssemblyKitFile} from '../modules/assembly/assembly.types';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AssemblyKitFilesService
{
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all files by assembly id
     *
     * @param assemblyId
     */
    getAll(assemblyId: number): Observable<AssemblyKitFile[]>
    {
        return this._httpClient.get<AssemblyKitFile[]>(`${environment.api}/assembly-kit-files/${assemblyId}`, {
            reportProgress: true
        }).pipe(
            tap((response: AssemblyKitFile[]) => {
                // Return space
                return response;
            })
        );
    }

    /**
     * Create file
     *
     * @param file
     */
    create(file: AssemblyKitFile): Observable<AssemblyKitFile>
    {
        return this._httpClient.post<AssemblyKitFile>(`${environment.api}/assembly-kit-files`, file, {
            reportProgress: true
        }).pipe(
            tap((response: AssemblyKitFile) => {
                // Return space
                return response;
            })
        );
    }

    /**
     * Sort files
     *
     * @param data
     */
    sort(data: any): Observable<any>
    {
        return this._httpClient.patch<any>(`${environment.api}/assembly-kit-files/sort`, data, {
            reportProgress: true
        }).pipe(
            tap((response: any) => {
                // Return space
                return response;
            })
        );
    }

    /**
     * Update file
     *
     * @param id
     * @param file
     */
    update(id: number, file: AssemblyKitFile): Observable<AssemblyKitFile>
    {
        return this._httpClient.patch<AssemblyKitFile>(`${environment.api}/assembly-kit-files/${id}`, file, {
            reportProgress: true
        }).pipe(
            tap((response: AssemblyKitFile) => {
                // Return space
                return response;
            })
        );
    }

    /**
     * Delete file
     *
     * @param id
     */
    delete(id: number): Observable<any>
    {
        return this._httpClient.delete<any>(`${environment.api}/assembly-kit-files/${id}`, {
            reportProgress: true
        }).pipe(
            tap((response: any) => {
                // Return space
                return response;
            })
        );
    }
}
