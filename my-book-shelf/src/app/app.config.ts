import { quotesReducer } from './store/quotes/quotes.reducer';
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
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { favoriteBooksReducer } from './store/favorite/favorite.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { firebaseConfig } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { recommendedBooksReducer } from './store/recommendedBooks/recommendedBooks.reducer';
import { RecommendedBooksEffects } from './store/recommendedBooks/recommendedBooks.effects';
import { myBooksReducer } from './store/my-books/my-books.reducer';
import { QuotesEffects } from './store/quotes/quotes.effects';
import { readerBookReducer } from './store/api-reader/api-reader.reducer';
import { ReaderBookEffects } from './store/api-reader/api-reader.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      books: booksReducer,
      recommendedBooks: recommendedBooksReducer,
      favoriteBooks: favoriteBooksReducer,
      router: routerReducer,
      myBooks: myBooksReducer,
      quotes: quotesReducer,
      readerBook: readerBookReducer,
    }),
    provideEffects(
      ReaderBookEffects,
      BooksEffects,
      RecommendedBooksEffects,
      QuotesEffects
    ),
    provideRouterStore(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig.firebase)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
