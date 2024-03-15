import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BooksEffects } from './books.effects';
import { booksReducer } from './books.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('books', booksReducer),
    EffectsModule.forFeature(BooksEffects),
  ],
})
export class BooksStoreModule {}
