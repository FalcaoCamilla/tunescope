import { Observable } from 'rxjs';
import { listType } from '@shared/models';
import { ApiResponse } from '@shared/models/api-response';

export interface IApiService {
  getListByName<T>(
    name: string,
    type: listType,
    limit: number,
    offset: number
  ): Observable<ApiResponse<T>[listType]>;
}