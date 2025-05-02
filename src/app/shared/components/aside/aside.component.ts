import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  authService = inject(AuthService)

  logout() {
    this.authService.logout();
  }
}
