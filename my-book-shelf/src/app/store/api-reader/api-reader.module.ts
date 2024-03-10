import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { readerBookReducer } from './api-reader.reducer';
import { ReaderBookEffects } from './api-reader.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature('readerBook', readerBookReducer),
    EffectsModule.forFeature(ReaderBookEffects),
  ],
})
export class ReaderBookStoreModule {}
