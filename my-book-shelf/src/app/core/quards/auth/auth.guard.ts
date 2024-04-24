import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isLoggedIn$.subscribe((isAuth) => {
    if (isAuth) {
      return true;
    } else {
      router.navigate(['auth/login']);
      return false;
    }
  });
};
