import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AuthStoreModule } from './auth';
import { BooksStoreModule } from './books';
import { QuotesStoreModule } from './quotes';
import { ReaderBookStoreModule } from './reader';
import { RecommendedBooksStoreModule } from './recommendedBooks';
import { RouterStoreModule } from './router';

@NgModule({
  imports: [
    ReaderBookStoreModule,
    AuthStoreModule,
    BooksStoreModule,
    QuotesStoreModule,
    RecommendedBooksStoreModule,
    RouterStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class StateModule {}
