import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from '../reducers/books.reducer';

export const selectBooksStore = createFeatureSelector<BooksState>('books');
export const selectBooks = createSelector(
  selectBooksStore,
  (state: BooksState) => state.books
);

export const selectLoading = createSelector(
  selectBooksStore,
  (state: BooksState) => state.isLoading
);
