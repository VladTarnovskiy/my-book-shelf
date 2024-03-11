import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './books.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('books', booksReducer),
    EffectsModule.forFeature(BooksEffects),
  ],
})
export class BooksStoreModule {}
