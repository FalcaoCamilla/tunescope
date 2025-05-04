import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album, listType } from '@shared/models';
import { ApiResponse } from '@shared/models/api-response';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { IApiService } from '@shared/interfaces/api';
import { ListParams } from '@shared/models/list-params';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getItemById<T>(id: string, itemType: listType): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${itemType}s/${id}`);
  }

  getListByName<T>(listParams: ListParams): Observable<{[key: string]: ApiResponse<T>}[listType]> {
    const params = new HttpParams()
      .set('q', listParams.searchTerm ?? listParams.listType)
      .set('type', listParams.listType)
      .set('limit', listParams.limit.toString())
      .set('offset', listParams.offset.toString());
  
    return this.http.get<{[key: string]: ApiResponse<T>}>(`${this.apiUrl}/search`, { params }).pipe(
      map((response) => response[listParams.listType+'s'])
    );
  }

  //artists-albums e albums-tracks
  getListById<T>(listParams: ListParams): Observable<ApiResponse<T>> {
    const params = new HttpParams()
      .set('limit', listParams.limit.toString())
      .set('offset', listParams.offset.toString());
    
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${listParams.itemType}s/${listParams.itemId}/${listParams.listType}s`, { params });
  }
}
