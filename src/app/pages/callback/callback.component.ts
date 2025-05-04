import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: ''
})
export class CallbackComponent implements OnInit { 
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          const code = params.get('code');
          if (code) return this.authService.exchangeCodeForToken(code);
          throw new Error('Código de autorização não encontrado.');
        })
      )
      .subscribe({
        next: (tokenData) => { this.authService.saveAuthData(tokenData) },
        error: (err) => { console.error('Erro ao trocar code por token:', err) }
      });
  }
}
