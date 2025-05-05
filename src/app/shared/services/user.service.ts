import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IUserService } from '@shared/interfaces/user.interface';
import { ApiResponse, listType } from '@shared/models';
import { ListParams } from '@shared/models/list-params';
import { User } from '@shared/models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService{
  http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  //uso de behavior para garantir que ao buscar detalhes do usuário o listener seja atualizado
  private userSubject = new BehaviorSubject<Partial<User> | null>(null);
  user$ = this.userSubject.asObservable();

  setSpotifyUser(): void {
    this.getCurrentUserDetails().subscribe({
      next: (userDetails) => this.setUser(userDetails),
      error: (err) => {
        console.error('Erro ao buscar detalhes do usuário Spotify:', err);
        this.userSubject.next(null);
      }
    });
  }

  setUser(user: Partial<User>): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser(): void {
    localStorage.removeItem('userData');
    this.userSubject.next(null);
  }

  getCurrentUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  getCurrentUserFavorites<T>(listParams: Pick<ListParams, 'listType'| 'limit'>): Observable<{[key: string]: ApiResponse<T>}[listType]> {
    const params = new HttpParams()
    .set('type', listParams.listType)
    .set('limit', listParams.limit.toString());

    return this.http.get<{[key: string]: ApiResponse<T>}>(`${this.apiUrl}/me/following`, { params }).pipe(
      map((response) => response[listParams.listType+'s'])
    );
  }
}
