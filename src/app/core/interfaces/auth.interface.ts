import { Observable } from 'rxjs';
import { AccessDataResponse } from '@core/models/access-data-response';

export interface IAuthService {
  isAuthenticated(): boolean;
  login(data: { display_name: string; password: string }): void;
  logout(): void;
  redirectToSpotifyAuth(): void;
  exchangeCodeForToken(code: string): Observable<AccessDataResponse>;
  saveAuthData(data: AccessDataResponse): void;
  authData: AccessDataResponse | null;
}