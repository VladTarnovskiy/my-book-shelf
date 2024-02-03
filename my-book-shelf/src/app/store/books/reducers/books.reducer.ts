import { createReducer, on } from '@ngrx/store';
import * as BooksActions from '../actions/books.action';
import { IBook } from '../../../shared/models/book.model';

export interface BooksState {
  books: IBook[] | null;
  searchValue: string;
  isLoading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: null,
  searchValue: '',
  isLoading: true,
  error: null,
};

export const booksReducer = createReducer(
  initialState,
  on(
    BooksActions.FetchBooks,
    (state, { searchValue }): BooksState => ({
      ...state,
      searchValue,
      isLoading: true,
    })
  ),
  on(
    BooksActions.FetchBooksSuccess,
    (state, { books }): BooksState => ({
      ...state,
      books,
      isLoading: false,
    })
  ),
  on(
    BooksActions.FetchBooksFailed,
    (state, { error }): BooksState => ({
      ...state,
      error,
      isLoading: false,
    })
  )
);
