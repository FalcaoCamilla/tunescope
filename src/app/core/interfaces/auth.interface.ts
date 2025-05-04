import { Observable } from 'rxjs';
import { AccessDataResponse, UserData } from '@core/models';

export interface IAuthService {
  isAuthenticated(): boolean;
  login(data: UserData): void;
  logout(): void;
  redirectToSpotifyAuth(): void;
  exchangeCodeForToken(code: string): Observable<AccessDataResponse>;
  saveAuthData(data: AccessDataResponse): void;
}