import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isLoggedIn$.subscribe((isAuth) => {
    if (isAuth) {
      return true;
    } else {
      return router.navigate(['auth/login']);
    }
  });
};
