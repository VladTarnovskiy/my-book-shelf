import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { quotesReducer } from './quotes.reducer';
import { QuotesEffects } from './quotes.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('quotes', quotesReducer),
    EffectsModule.forFeature(QuotesEffects),
  ],
})
export class QuotesStoreModule {}
