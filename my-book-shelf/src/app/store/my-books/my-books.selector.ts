import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyBooksState } from './my-books.reducer';
import { selectRouteParams } from '../router.selectors';

export const selectMyBooksStore =
  createFeatureSelector<MyBooksState>('myBooks');

export const selectMyBooks = createSelector(
  selectMyBooksStore,
  (state: MyBooksState) => state.books
);

export const selectMyBooksFavorite = createSelector(
  selectMyBooksStore,
  (state: MyBooksState) =>
    state.books.filter((book) => book.isFavorite === true)
);

export const selectMyBookForId = createSelector(
  selectMyBooksStore,
  selectRouteParams,
  (state: MyBooksState, { myBookId }) => {
    const bookId = myBookId as string;
    const selectedBook = state.books.find((book) => book.id === bookId);
    return selectedBook || null;
  }
);
