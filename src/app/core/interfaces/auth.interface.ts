import { AccessDataResponse } from "@core/models/access-data-response";
import { UserData } from "@core/models/user";
import { Observable } from "rxjs";

export interface IAuthService {
  isAuthenticated(): boolean;
  register(data: UserData): void;
  login(data: UserData): void;
  logout(): void;
}