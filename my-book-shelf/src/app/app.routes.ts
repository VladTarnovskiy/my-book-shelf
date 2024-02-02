import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { SearchComponent } from './search/pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];
