import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { listType } from '@shared/models';
import { ApiResponse } from '@shared/models/api-response';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getListByName<T>(name: string, type: listType, limit: number, offset: number): Observable<ApiResponse<T>[listType]> {
    const params = new HttpParams()
      .set('q', name)
      .set('type', type)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
  
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/search`, { params }).pipe(
      map((response) => response[type+'s'])
    );
  }
}
