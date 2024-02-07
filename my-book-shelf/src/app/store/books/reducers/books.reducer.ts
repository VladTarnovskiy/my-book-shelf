import { createReducer, on } from '@ngrx/store';
import * as BooksActions from '../actions/books.action';
import { IBook } from '../../../shared/models/book.model';
import {
  FilterCategoryKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';

export interface BooksState {
  books: IBook[];
  previewBook: IBook | null;
  searchValue: string;
  isLoading: boolean;
  isPreviewLoading: boolean;
  error: string | null;
  filterType: FilterTypesKeys;
  filterCategoryType: FilterCategoryKeys;
}

export const initialState: BooksState = {
  books: [],
  previewBook: null,
  searchValue: '',
  isLoading: true,
  isPreviewLoading: true,
  error: null,
  filterType: 'All',
  filterCategoryType: 'Browse',
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
  ),
  on(
    BooksActions.FetchBook,
    (state): BooksState => ({
      ...state,
      isPreviewLoading: true,
    })
  ),
  on(
    BooksActions.FetchBookSuccess,
    (state, { previewBook }): BooksState => ({
      ...state,
      previewBook,
      isPreviewLoading: false,
    })
  ),
  on(
    BooksActions.FetchBookFailed,
    (state, { error }): BooksState => ({
      ...state,
      error,
      isPreviewLoading: false,
    })
  ),
  on(
    BooksActions.SetFilterCategoryType,
    (state, { filterCategoryType }): BooksState => ({
      ...state,
      filterCategoryType,
    })
  ),
  on(
    BooksActions.AddFavoriteStatus,
    (state, { bookId }): BooksState => ({
      ...state,
      books: [...state.books].map((book) => {
        if (book.id === bookId) {
          return { ...book, isFavorite: true };
        } else {
          return book;
        }
      }),
    })
  ),
  on(
    BooksActions.RemoveFavoriteStatus,
    (state, { bookId }): BooksState => ({
      ...state,
      books: [...state.books].map((book) => {
        if (book.id === bookId) {
          return { ...book, isFavorite: false };
        } else {
          return book;
        }
      }),
    })
  )
);
