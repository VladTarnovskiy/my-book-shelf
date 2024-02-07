import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
];
