import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { IAuthService } from '@core/interfaces/auth.interface';
import { AccessDataResponse, UserData } from '@core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  router = inject(Router);
  http = inject(HttpClient);
  private readonly AUTH_KEY = 'authData';
  private readonly apiUrl = environment.apiUrl;

  get user(): UserData | null {
    const authData = localStorage.getItem(this.AUTH_KEY);
    return authData ? JSON.parse(authData) : null;
  }

  get users(): UserData[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }
  
  isAuthenticated(): boolean {
    return !!this.user?.token;
  }

  register(data: UserData): void {
    const userExists = this.users.some(u => u.username === data.username);
    if (userExists) {
      console.error('Usuário já cadastrado.');
      return;
    }
    /* cópia superficial do array atual para evitar manipulação direta ao meu getter
     * sendo modificado apenas localmente antes de ser salvo no localStorage
     */
    const users = this.users;
    users.push(data); 
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(data: UserData): void {
    const userExists = this.users.some(u => u.username === data.username);
    if (userExists) {
      this.generateToken().subscribe({
        next: (response) => {
          const userDataWithToken = { ...data, token: response.access_token };
          localStorage.setItem(this.AUTH_KEY, JSON.stringify(userDataWithToken));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao gerar token:', err);
        }
      });
    } else {
      console.error('Usuário nao cadastrado.');
    }
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }

  private generateToken(): Observable<AccessDataResponse> {
    const body = 'grant_type=client_credentials'
    return this.http.post<AccessDataResponse>(`${this.apiUrl}/token`, body)
  }
}
