import { ApiResponse, listType } from '@shared/models';
import { ListParams } from '@shared/models/list-params';
import { User } from '@shared/models/user';
import { Observable } from 'rxjs';

export interface IUserService {
  setSpotifyUser(): void; //busca e define os detalhes do usuário autenticado pelo Spotify
  setUser(user: Partial<User>): void; //define manualmente os dados do usuário
  clearUser(): void; //limpa os dados do usuário
  getCurrentUserDetails(): Observable<User>; //busca os detalhes do usuário atual
  getCurrentUserFavorites<T>(
    listParams: Pick<ListParams, 'listType' | 'limit'>
  ): Observable<{ [key: string]: ApiResponse<T> }[listType]>; //busca os favoritos do usuário
}