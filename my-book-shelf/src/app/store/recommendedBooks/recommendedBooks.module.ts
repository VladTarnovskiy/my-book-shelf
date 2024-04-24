import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RecommendedBooksEffects } from './recommendedBooks.effects';
import { recommendedBooksReducer } from './recommendedBooks.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('recommendedBooks', recommendedBooksReducer),
    EffectsModule.forFeature(RecommendedBooksEffects),
  ],
})
export class RecommendedBooksStoreModule {}
