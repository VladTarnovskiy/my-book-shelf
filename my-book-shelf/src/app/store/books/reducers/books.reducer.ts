import { createReducer, on } from '@ngrx/store';
import * as BooksActions from '../actions/books.action';
import { IBook } from '../../../shared/models/book.model';
import { FilterTypesKeys } from '../../../shared/interfaces/filters';

export interface BooksState {
  books: IBook[] | null;
  searchValue: string;
  isLoading: boolean;
  error: string | null;
  filterType: FilterTypesKeys;
}

export const initialState: BooksState = {
  books: null,
  searchValue: '',
  isLoading: true,
  error: null,
  filterType: 'All',
};

export const booksReducer = createReducer(
  initialState,
  on(
    BooksActions.FetchBooks,
    (state, { searchValue, filterType }): BooksState => ({
      ...state,
      searchValue,
      filterType,
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
