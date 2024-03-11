import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth.reducer';

@NgModule({
  imports: [StoreModule.forFeature('auth', authReducer)],
})
export class AuthStoreModule {}
