import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@environments/environment';

@Injectable()
export class HttpRequestHeaderInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  private readonly client = environment.client;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = this.buildHeaders(request.url);
    const clonedRequest = request.clone({ headers });
    return next.handle(clonedRequest);
  }

  buildHeaders(url: string): HttpHeaders {
    if(url.includes('token')) {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${this.client.id}:${this.client.secret}`)
      })
    } 
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${this.authService.user?.token}`
    })
  }
}
