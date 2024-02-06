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
      import('./search/pages/details/details.component').then(
        (m) => m.DetailsComponent
      ),
    // import('./search/pages/search/search.component').then(
    //   (m) => m.SearchComponent
    // ),
  },
  {
    path: 'favorite',
    loadComponent: () =>
      import('./favorite/pages/favorite/favorite.component').then(
        (m) => m.FavoriteComponent
      ),
  },
];
