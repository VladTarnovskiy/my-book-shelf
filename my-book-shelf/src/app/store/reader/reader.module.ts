import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ReaderBookEffects } from './reader.effects';
import { readerBookReducer } from './reader.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('bookReader', readerBookReducer),
    EffectsModule.forFeature(ReaderBookEffects),
  ],
})
export class ReaderBookStoreModule {}
