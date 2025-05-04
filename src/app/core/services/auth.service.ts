import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { IAuthService } from '@core/interfaces/auth.interface';
import { AccessDataResponse, UserData } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  router = inject(Router);
  http = inject(HttpClient);
  private readonly AUTH_KEY = 'authData';
  private readonly authUrl = environment.authUrl;
  private readonly redirectUri = environment.redirectUri;
  private readonly accountsSpotifyUrl = environment.accountsSpotifyUrl;

  get user(): UserData | null {
    const authData = localStorage.getItem(this.AUTH_KEY);
    return authData ? JSON.parse(authData) : null;
  }
  
  isAuthenticated(): boolean {
    return !!this.user?.token;
  }

  login(data: UserData): void {
    localStorage.setItem('user', JSON.stringify(data));
    this.generateToken().subscribe({
      next: (response) => {
        const userDataWithToken = { ...data, token: response.access_token };
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(userDataWithToken));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao gerar token:', err);
      }
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
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  private generateToken(): Observable<AccessDataResponse> {
    const body = 'grant_type=client_credentials'
    return this.http.post<AccessDataResponse>(`${this.authUrl}`, body)
  }
}
