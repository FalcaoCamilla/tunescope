import { UserData } from "@core/models/user";

export interface IAuthService {
  isAuthenticated(): boolean;
  register(data: UserData): void;
  login(data: UserData): void;
  logout(): void;
}