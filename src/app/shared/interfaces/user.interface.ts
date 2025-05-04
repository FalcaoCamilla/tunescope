import { User } from '@shared/models/user';
import { Observable } from 'rxjs';

export interface IUserService {
  getUser(): Observable<User>;
}