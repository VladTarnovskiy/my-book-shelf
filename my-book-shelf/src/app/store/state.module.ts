import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ReaderBookStoreModule } from './api-reader';
import { AuthStoreModule } from './auth';
import { BooksStoreModule } from './books';
import { QuotesStoreModule } from './quotes';
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
  ],
})
export class StateModule {}
