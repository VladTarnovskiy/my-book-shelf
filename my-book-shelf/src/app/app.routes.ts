import { Routes } from '@angular/router';
import { authGuard } from '@core/quards/auth';
import { LayoutComponent } from '@pages/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home').then((m) => m.HomeComponent),
      },
      {
        path: 'recent',
        loadComponent: () =>
          import('./pages/recent').then((m) => m.RecentComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile').then((m) => m.ProfileComponent),
      },
      {
        path: 'recommended',
        loadComponent: () =>
          import('./pages/recommended').then((m) => m.RecommendedComponent),
      },

      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/search').then((m) => m.SearchComponent),
          },
          {
            path: 'preview/:previewId',
            loadComponent: () =>
              import('./pages/preview').then((m) => m.PreviewComponent),
          },
          {
            path: 'reader/:readerId',
            loadComponent: () =>
              import('./pages/api-book-reader').then(
                (m) => m.ApiBookReaderComponent
              ),
          },
        ],
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./pages/favorite').then((m) => m.FavoriteComponent),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./pages/upload').then((m) => m.UploadComponent),
      },
      {
        path: 'my-books',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/my-books').then((m) => m.MyBooksComponent),
          },
          {
            path: 'reader/:myBookId',
            loadComponent: () =>
              import('./pages/reader').then((m) => m.ReaderComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'registration',
        loadComponent: () =>
          import('./pages/registration').then((m) => m.RegistrationComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login').then((m) => m.LoginComponent),
      },
      {
        path: 'verification',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/verification').then(
                (m) => m.VerificationComponent
              ),
          },
          {
            path: 'success',
            loadComponent: () =>
              import('./pages/success').then((m) => m.SuccessComponent),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found').then((m) => m.NotFoundComponent),
  },
];
