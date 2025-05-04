import { Observable } from 'rxjs';
import { listType } from '@shared/models';
import { ApiResponse } from '@shared/models/api-response';
import { ListParams } from '@shared/models/list-params';

export interface IApiService {
  getListByName<T>(listParams: ListParams): Observable<{[key: string]: ApiResponse<T>}[listType]>
  getListById<T>(listParams: ListParams): Observable<ApiResponse<T>>
  getItemById<T>(id: string, type: listType): Observable<T>
}