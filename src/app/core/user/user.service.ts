import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {User, UserNode, UserNodePaginate, UserOccupation} from 'app/core/user/user.model';
import {environment} from '../../../environments/environment';
import {Condominium} from '../../modules/condominium/condominium.types';
import {Package} from '../../modules/package/package.types';
import {Survey} from '../../modules/survey/survey.types';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _users: BehaviorSubject<UserNode[] | null> = new BehaviorSubject([]);
    private _userNode: ReplaySubject<UserNode> = new ReplaySubject<UserNode>(1);
    private _occupations: BehaviorSubject<UserOccupation[] | null> = new BehaviorSubject([]);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,
                private _router: Router,)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        localStorage.setItem('user', JSON.stringify(value));
    }

    get user(): User
    {
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Setter user node
     *
     * @param user
     */
    set userNode(user: UserNode)
    {
        // Store the value
        this._userNode.next(user);
    }

    get user$(): Observable<UserNode>
    {
        return this._userNode.asObservable();
    }

    get users$(): Observable<UserNode[]>
    {
        return this._users.asObservable();
    }

    get occupations$(): Observable<UserOccupation[]>
    {
        return this._occupations.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all users
     */
    getAll(page: number = 1, limit: number = environment.pageSize, search: string = '', occupationId: number = 0): Observable<UserNodePaginate>
    {
        return this._httpClient.get<UserNodePaginate>(`${environment.api}/users?page=${page}&limit=${limit}${search ? '&search=' + search : ''}${occupationId ? '&occupationId=' + occupationId : ''}`, {
            reportProgress: true
        }).pipe(
            tap((paginate: UserNodePaginate) => {
                // Update paginate
                this._users.next(paginate.items);

                // Return paginate
                return paginate;
            })
        );
    }

    create(user: UserNode): Observable<UserNode>
    {
        return this.users$.pipe(
            take(1),
            switchMap((users) => this._httpClient.post<UserNode>(`${environment.api}/users`, user, {
                reportProgress: true,
            }).pipe(
                map((newUser) => {

                    // Update user with the new user
                    this._users.next([newUser, ...users]);

                    // Return the new user
                    return newUser;
                })
            ))
        );
    }

    update(id: number, user: UserNode): Observable<UserNode>
    {
        return this.users$.pipe(
            take(1),
            switchMap((users) => this._httpClient.patch<UserNode>(`${environment.api}/users/${id}`, user, {
                reportProgress: true,
            }).pipe(
                map((updatedUser) => {

                    const index = users.findIndex(x => x.id === id);

                    users[index] = updatedUser;

                    // Update user with the updated user
                    this._users.next(users);

                    // Return the updated user
                    return updatedUser;
                })
            ))
        );
    }

    remove(id: number): Observable<any>
    {
        return this.users$.pipe(
            take(1),
            switchMap((users) => this._httpClient.delete<UserNode>(`${environment.api}/users/${id}`, {
                reportProgress: true,
            }).pipe(
                map((isDeleted) => {

                    const index = users.findIndex(x => x.id === id);

                    users.splice(index, 1);

                    // Update user with the updated user
                    this._users.next(users);

                    // Return the updated user
                    return isDeleted;
                })
            ))
        );
    }

    resetLink(id: number, user: UserNode): Observable<UserNode>
    {
        return this._httpClient.patch<UserNode>(`${environment.api}/users/${id}`, user, {
            reportProgress: true
        }).pipe(
            tap((userUpdated: UserNode) => {
                return userUpdated;
            })
        );
    }

    /**
     * Get user logged
     */
    getMe(): Observable<UserNode>
    {
        return this._httpClient.get<UserNode>(`${environment.api}/users/me`, {
            reportProgress: true
        }).pipe(
            tap((user: UserNode) => {
                // Update userNode
                this._userNode.next(user);

                if (user.enterprise_id === null){
                    return this._router.navigateByUrl('/empresas');
                }
                // Return condominiums
                return user;
            })
        );
    }

    getOccupation(): Observable<UserOccupation[]>
    {
        return this._httpClient.get<UserOccupation[]>(`${environment.api}/user-occupations`, {
            reportProgress: true
        }).pipe(
            tap((occupations: UserOccupation[]) => {
                // Update userNode
                this._occupations.next(occupations);

                // Return condominiums
                return occupations;
            })
        );
    }

    getResetToken(userId: number): Observable<any>
    {
        return this._httpClient.get<any>(`${environment.api}/users/reset-password/${userId}`, {
            reportProgress: true
        }).pipe(
            tap((response: any) => {
                // Return token
                return response.token;
            })
        );
    }
}
