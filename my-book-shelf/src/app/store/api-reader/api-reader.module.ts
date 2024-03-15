import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ReaderBookEffects } from './api-reader.effects';
import { readerBookReducer } from './api-reader.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('readerBook', readerBookReducer),
    EffectsModule.forFeature(ReaderBookEffects),
  ],
})
export class ReaderBookStoreModule {}
