// auth interceptor
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  /**
   * overrides all the API's with the provided configs
   * @param request original request
   * @param next emit a new req
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string = '';
    const authRequest: HttpRequest<unknown> = request.clone({
      headers: request.headers.set(
        'Authorization',
        token
          ? token
          : localStorage.getItem('token')
          ? localStorage.getItem('token')
          : 'abc'
      ),
    });
    return next.handle(authRequest);
  }
}
