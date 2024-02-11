import { Routes } from '@angular/router';
import { LayoutComponent } from './core/pages/layout/layout.component';
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
      },
      {
        path: 'recent',
        loadComponent: () =>
          import('./home/pages/recent/recent.component').then(
            (m) => m.RecentComponent
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/pages/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'search/preview/:previewId',
        loadComponent: () =>
          import('./search/pages/preview/preview.component').then(
            (m) => m.PreviewComponent
          ),
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./favorite/pages/favorite/favorite.component').then(
            (m) => m.FavoriteComponent
          ),
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
