import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { QuotesEffects } from './quotes.effects';
import { quotesReducer } from './quotes.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('quotes', quotesReducer),
    EffectsModule.forFeature(QuotesEffects),
  ],
})
export class QuotesStoreModule {}
