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
];
