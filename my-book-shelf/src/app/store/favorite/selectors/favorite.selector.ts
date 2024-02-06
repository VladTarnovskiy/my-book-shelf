import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteBooksState } from '../reducers/favorite.reducer';

export const selectFavoriteBooksStore =
  createFeatureSelector<FavoriteBooksState>('favoriteBooks');
export const selectFavoriteBooks = createSelector(
  selectFavoriteBooksStore,
  (state: FavoriteBooksState) => state.books
);
