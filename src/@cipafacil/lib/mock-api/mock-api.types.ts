import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CipaFacilMockApiReplyCallback =
    | ((data: { request: HttpRequest<any>; urlParams: { [key: string]: string } }) => ([number, string | any]) | Observable<any>)
    | undefined;

export type CipaFacilMockApiMethods =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';
