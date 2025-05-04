import { UserData } from "@core/models/user";

export interface IAuthService {
  isAuthenticated(): boolean;
  login(data: UserData): void;
  logout(): void;
}