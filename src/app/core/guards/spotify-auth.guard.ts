import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const spotifyAuthGuard: CanActivateFn = (route, state) => {
  const AUTH_KEY = 'authData';
  const router = inject(Router);
  const authData = localStorage.getItem(AUTH_KEY);
  const loginType = authData ? JSON.parse(authData).login_type : null;

  if (loginType === 'spotify') {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
