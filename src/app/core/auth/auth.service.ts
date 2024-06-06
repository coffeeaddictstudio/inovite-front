import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  switchMap } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('access_token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token') ?? '';
    }

    /**
     * Setter & getter for node token
     */
    set nodeToken(token: string)
    {
        localStorage.setItem('node_token', token);
    }

    get nodeToken(): string
    {
        return localStorage.getItem('node_token') ?? '';
    }

    /**
     * Setter & getter for refresh token
     */
    set refreshToken(token: string)
    {
        localStorage.setItem('refresh_token', token);
    }

    get refreshToken(): string
    {
        return localStorage.getItem('refresh_token') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(`${environment.api}/forgot-password`, {
            email
        });
    }

    /**
     * Reset password
     *
     * @param token
     * @param password
     */
    resetPassword(token: string, password: string): Observable<any>
    {
        return this._httpClient.post(`${environment.api}/reset-password`, {
            token,
            password
        });
    }

    /**
     * User password
     *
     * @param token
     * @param password
     */
    userPassword(token: string, password: string): Observable<any>
    {
        return this._httpClient.post(`${environment.api}/user-password`, {
            token,
            password
        });
    }

    /**
     * Sign in node
     *
     * @param username
     * @param password
     */
    signIn(username: string, password: string): Observable<any>
    {
        return this._httpClient.post(`${environment.api}/sign-in`, {
            username,
            password
        }).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.nodeToken = response.access_token;

                // Store the access token in the local storage
                this.accessToken = response.firebase_token;

                // Store the refresh token in the local storage
                this.refreshToken = response.firebase_refresh_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.firebase_user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Clear local storage
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('node_token');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string, email: string, password: string, company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string, password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Is authenticated
        return of(true);
    }
}
