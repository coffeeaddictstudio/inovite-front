import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {CipaFacilConfirmationService} from '../../../@inovite/services/confirmation';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _cipaFacilConfirmationDialog: CipaFacilConfirmationService,
        private _matDialog: MatDialog
    ) {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        if (req.reportProgress && this._authService.nodeToken)
        {
            newReq = req.clone({
                headers: req.headers.set('authorization', 'Bearer ' + this._authService.nodeToken),
                reportProgress: true
            });
        } else {
            if ( this._authService.accessToken && this._authService.refreshToken)
            {
                if (req.url === 'https://api.cipa.com.br/smartged/getAcessoTemporarioS3') {
                    newReq = req.clone({
                        headers: req.headers.set('authorization', this._authService.accessToken)
                            .set('content-type', 'application/json')
                    });
                } else {
                    newReq = req.clone({
                        headers: req.headers.set('authorization', this._authService.accessToken)
                            .set('refreshtoken', this._authService.refreshToken)
                            .set('content-type', 'application/json')
                    });
                }
            }
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                /*if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    if (this._matDialog.getDialogById('dialog-unauthorized')) {
                        return;
                    }

                    this._cipaFacilConfirmationDialog.open({
                        id: 'dialog-unauthorized',
                        title: 'Desculpe :(',
                        message: 'Você não possui permissão para acessar essa funcionalidade!',
                        icon: {
                            show: true,
                            name: 'heroicons_outline:exclamation',
                            color: 'warn'
                        },
                        actions: {
                            confirm: {
                                show: true,
                                label: 'Ir para dashboard',
                                color: 'warn'
                            },
                            cancel: {
                                show: false,
                                label: 'Ir para dashboard'
                            }
                        },
                        dismissible: false
                    })
                        .afterClosed()
                        .subscribe(() => {
                            return this._router.navigateByUrl('/dashboard');
                        });
                }*/

                return throwError(error);
            })
        );
    }
}
