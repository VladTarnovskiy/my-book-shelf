import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteBooksState } from './favorite.reducer';

export const selectFavoriteBooksStore =
  createFeatureSelector<FavoriteBooksState>('favoriteBooks');

export const selectFavoriteBooks = createSelector(
  selectFavoriteBooksStore,
  (state: FavoriteBooksState) => state.books
);
