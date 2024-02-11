import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { booksReducer } from './store/books/reducers/books.reducer';
import { BooksEffects } from './store/books/effects/books.effects';
import { favoriteBooksReducer } from './store/favorite/reducers/favorite.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { firebaseConfig } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      books: booksReducer,
      favoriteBooks: favoriteBooksReducer,
      router: routerReducer,
    }),
    provideEffects(BooksEffects),
    provideRouterStore(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig.firebase)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
