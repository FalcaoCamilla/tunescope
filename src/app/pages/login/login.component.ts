import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);
  showPassword = signal(false);
  form = new FormGroup({
    display_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAsDirty();
      return
    }
    const userData = this.form.getRawValue() as {display_name: string, password: string};
    this.authService.login(userData);
  }  

  loginWithSpotify() {
    this.authService.redirectToSpotifyAuth();
  }

}
