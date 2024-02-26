import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthStore = createFeatureSelector<AuthState>('auth');

export const selectUserName = createSelector(
  selectAuthStore,
  (state: AuthState) => state.userName
);
