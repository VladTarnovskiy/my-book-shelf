import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyBooksState } from './my-books.reducer';

export const selectMyBooksStore =
  createFeatureSelector<MyBooksState>('myBooks');

export const selectMyBooks = createSelector(
  selectMyBooksStore,
  (state: MyBooksState) => state.books
);
