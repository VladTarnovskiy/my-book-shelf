import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './core/quards/auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'recent',
        loadComponent: () =>
          import('./pages/recent/recent.component').then(
            (m) => m.RecentComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'recommended',
        loadComponent: () =>
          import('./pages/recommended/recommended.component').then(
            (m) => m.RecommendedComponent
          ),
      },

      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/search/search.component').then(
                (m) => m.SearchComponent
              ),
          },
          {
            path: 'preview/:previewId',
            loadComponent: () =>
              import('./pages/preview/preview.component').then(
                (m) => m.PreviewComponent
              ),
          },
          {
            path: 'reader/:readerId',
            loadComponent: () =>
              import('./pages/api-book-reader/api-book-reader.component').then(
                (m) => m.ApiBookReaderComponent
              ),
          },
        ],
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./pages/favorite/favorite.component').then(
            (m) => m.FavoriteComponent
          ),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./pages/upload/upload.component').then(
            (m) => m.UploadComponent
          ),
      },
      {
        path: 'my-books',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/my-books/my-books.component').then(
                (m) => m.MyBooksComponent
              ),
          },
          {
            path: 'reader/:myBookId',
            loadComponent: () =>
              import('./pages/reader/reader.component').then(
                (m) => m.ReaderComponent
              ),
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
          import('./pages/registration/registration.component').then(
            (m) => m.RegistrationComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'verification',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/verification/verification.component').then(
                (m) => m.VerificationComponent
              ),
          },
          {
            path: 'success',
            loadComponent: () =>
              import('./pages/success/success.component').then(
                (m) => m.SuccessComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
