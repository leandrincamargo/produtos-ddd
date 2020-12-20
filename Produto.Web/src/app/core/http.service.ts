import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpService implements HttpInterceptor {
  constructor(private loginService: AuthService, private appService: AppService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type'))
      req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    if (!req.url.includes(this.appService.apiUrl)) return next.handle(req).pipe();

    req = this.adicionarToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) return throwError(error);

        this.loginService.logout();
        return throwError({ message: 'Sessão expirada. Por favor, realize novo login' });
      }),
    );
  }

  private adicionarToken(req: HttpRequest<any>): HttpRequest<any> {
    let token = localStorage.getItem(btoa('usuarioLogado'))
      ? JSON.parse(atob(localStorage.getItem(btoa('usuarioLogado'))))
      : null;
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Audience: 'te67b600-duthf896-7e5ut9cf-2549f7ef',
        Reference: window.location.hostname,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
