import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { recommendedBooksReducer } from './recommendedBooks.reducer';
import { RecommendedBooksEffects } from './recommendedBooks.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('recommendedBooks', recommendedBooksReducer),
    EffectsModule.forFeature(RecommendedBooksEffects),
  ],
})
export class RecommendedBooksStoreModule {}
