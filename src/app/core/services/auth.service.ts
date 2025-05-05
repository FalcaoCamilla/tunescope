import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AccessDataResponse } from '@core/models/access-data-response';
import { IAuthService } from '@core/interfaces/auth.interface';
import { Observable } from 'rxjs';
import { UserService } from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  router = inject(Router);
  http = inject(HttpClient);
  userService = inject(UserService);
  private readonly AUTH_KEY = 'authData';
  private readonly authUrl = environment.authUrl;
  private readonly redirectUri = environment.redirectUri;
  private readonly accountsSpotifyUrl = environment.accountsSpotifyUrl;

  get authData(): AccessDataResponse | null {
    const authData = localStorage.getItem(this.AUTH_KEY);
    return authData ? JSON.parse(authData) : null;
  }
  
  isAuthenticated(): boolean {
    return !!this.authData?.access_token;
  }

  login(data: {display_name: string, password: string}): void {
    this.userService.setUser(data);
    this.generateToken().subscribe({
      next: (response) => {
        const authData = {
          access_token: response.access_token,
          token_type: 'tunescope',
          created_at: new Date().getTime()
        };
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
        this.router.navigate(['/artists']);
      },
      error: (err) => { console.error('Erro ao gerar token:', err) }
    });
  }

  redirectToSpotifyAuth(): void {
    const params = new HttpParams()
      .set('client_id', environment.clientId)
      .set('response_type', 'code')
      .set('redirect_uri', this.redirectUri)
      .set('scope', 'user-read-private user-read-email');
  
    const authUrl = `${this.accountsSpotifyUrl}authorize?${params.toString()}`;
    window.location.href = authUrl;
  }

  exchangeCodeForToken(code: string): Observable<AccessDataResponse> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', environment.clientId)
      .set('client_secret', environment.clientSecret);
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    return this.http.post<AccessDataResponse>(
      `${this.accountsSpotifyUrl}api/token`, body.toString(), { headers }
    );
  }

  saveAuthData(data: AccessDataResponse): void {
    const authData = {
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      created_at: new Date().getTime()
    };
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
    this.userService.setSpotifyUser();
    this.router.navigate(['/artists']);
  }

  private generateToken(): Observable<AccessDataResponse> {
    const body = 'grant_type=client_credentials'
    return this.http.post<AccessDataResponse>(`${this.authUrl}`, body)
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
