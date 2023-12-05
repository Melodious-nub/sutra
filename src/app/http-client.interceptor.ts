import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    return next.handle(this.addAuthenticationToken(request, token));
  }

  addAuthenticationToken(request: HttpRequest<any>, token:any) {
    // console.log('token from', token)
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}