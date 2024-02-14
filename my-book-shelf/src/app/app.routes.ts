import { Routes } from '@angular/router';
import { LayoutComponent } from './core/pages/layout/layout.component';
import { authGuard } from './core/quards/auth/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'recent',
        loadComponent: () =>
          import('./home/pages/recent/recent.component').then(
            (m) => m.RecentComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'recommended',
        loadComponent: () =>
          import('./home/pages/recommended/recommended.component').then(
            (m) => m.RecommendedComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/pages/search/search.component').then(
            (m) => m.SearchComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'search/preview/:previewId',
        loadComponent: () =>
          import('./search/pages/preview/preview.component').then(
            (m) => m.PreviewComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./favorite/pages/favorite/favorite.component').then(
            (m) => m.FavoriteComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'registration',
        loadComponent: () =>
          import('./auth/pages/registration/registration.component').then(
            (m) => m.RegistrationComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
];
