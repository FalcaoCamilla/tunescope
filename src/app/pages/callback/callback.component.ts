import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.authService.exchangeCodeForToken(code).subscribe({
          next: (tokenData) => {
            this.authService.saveAuthData(tokenData); // salva token
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao trocar code por token:', err);
          }
        });
      }
    });
  }
}
