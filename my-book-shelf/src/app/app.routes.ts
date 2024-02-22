import { Routes } from '@angular/router';
import { LayoutComponent } from './core/pages/layout/layout.component';
import { authGuard } from './core/quards/auth/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
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
        path: 'recommended',
        loadComponent: () =>
          import('./home/pages/recommended/recommended.component').then(
            (m) => m.RecommendedComponent
          ),
      },

      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./search/pages/search/search.component').then(
                (m) => m.SearchComponent
              ),
          },
          {
            path: 'preview/:previewId',
            loadComponent: () =>
              import('./search/pages/preview/preview.component').then(
                (m) => m.PreviewComponent
              ),
          },
          {
            path: 'reader/:isbnId',
            loadComponent: () =>
              import(
                './search/pages/api-book-reader/api-book-reader.component'
              ).then((m) => m.ApiBookReaderComponent),
          },
        ],
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./favorite/pages/favorite/favorite.component').then(
            (m) => m.FavoriteComponent
          ),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./my-books/pages/upload/upload.component').then(
            (m) => m.UploadComponent
          ),
      },
      {
        path: 'my-books',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./my-books/pages/my-books/my-books.component').then(
                (m) => m.MyBooksComponent
              ),
          },
          {
            path: 'reader/:myBookId',
            loadComponent: () =>
              import('./my-books/pages/reader/reader.component').then(
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
      {
        path: 'verification',
        loadComponent: () =>
          import('./auth/pages/verification/verification.component').then(
            (m) => m.VerificationComponent
          ),
      },
    ],
  },
];
