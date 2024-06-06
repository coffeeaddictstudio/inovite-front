import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Notification, NotificationPaginate} from 'app/layout/common/notifications/notifications.types';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UserNode} from '../../../core/user/user.model';
import {UserService} from '../../../core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notifications: BehaviorSubject<Notification[]> = new BehaviorSubject([]);

    private _user: UserNode;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
        this._userService.user$
            .subscribe((user) => {
                this._user = user;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getAll(): void
    {

    }
}
