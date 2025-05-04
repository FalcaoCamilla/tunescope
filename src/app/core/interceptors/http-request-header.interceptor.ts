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
  private readonly clientId = environment.clientId;
  private readonly clientSecret = environment.clientSecret;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = this.buildHeaders(request.url);
    const clonedRequest = request.clone({ headers });
    return next.handle(clonedRequest);
  }

  buildHeaders(url: string): HttpHeaders {
    if(url.includes('token')) {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
      })
    } 
    if (url.includes('wikipedia')) {
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${this.authService.authData?.access_token}`
    })
  }
}
