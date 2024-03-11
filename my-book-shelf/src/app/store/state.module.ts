import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReaderBookStoreModule } from './api-reader/api-reader.module';
import { AuthStoreModule } from './auth/auth.module';
import { BooksStoreModule } from './books/books.module';
import { QuotesStoreModule } from './quotes/quotes.module';
import { RecommendedBooksStoreModule } from './recommendedBooks/recommendedBooks.module';
import { RouterStoreModule } from './router/router.module';

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
