import { createReducer, on } from '@ngrx/store';

import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../shared/interfaces/filters';
import { IBook } from '../../shared/models/book';
import * as BOOKS_ACTIONS from './books.action';

export interface BooksState {
  books: IBook[];
  totalItems: number;
  page: number;
  previewBook: IBook | null;
  searchValue: string;
  isLoading: boolean;
  isPreviewLoading: boolean;
  previewError: string | null;
  error: string | null;
  filterType: FilterTypesKeys;
  categoryFilterType: CategoryFilterKeys;
}

export const initialState: BooksState = {
  books: [],
  totalItems: 0,
  previewBook: null,
  page: 0,
  searchValue: '',
  isLoading: false,
  isPreviewLoading: false,
  previewError: null,
  error: null,
  filterType: 'All',
  categoryFilterType: 'Browse',
};

export const booksReducer = createReducer(
  initialState,
  on(
    BOOKS_ACTIONS.FetchBooks,
    (
      state,
      { searchValue, filterType, categoryFilterType, page }
    ): BooksState => {
      if (page === 0) {
        return {
          ...state,
          books: [],
          searchValue,
          filterType,
          categoryFilterType,
          isLoading: true,
        };
      } else {
        return {
          ...state,
          searchValue,
          filterType,
          categoryFilterType,
          isLoading: true,
        };
      }
    }
  ),
  on(BOOKS_ACTIONS.FetchBooksSuccess, (state, { books, page }): BooksState => {
    if (page === 0) {
      return {
        ...state,
        books,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        books: [...state.books, ...books],
        isLoading: false,
      };
    }
  }),
  on(
    BOOKS_ACTIONS.FetchBooksFailed,
    (state, { error }): BooksState => ({
      ...state,
      error,
      books: [],
      isLoading: false,
    })
  ),
  on(
    BOOKS_ACTIONS.FetchPreviewBook,
    (state): BooksState => ({
      ...state,
      previewBook: null,
      isPreviewLoading: true,
    })
  ),
  on(
    BOOKS_ACTIONS.FetchPreviewBookSuccess,
    (state, { previewBook }): BooksState => ({
      ...state,
      previewBook,
      isPreviewLoading: false,
    })
  ),
  on(
    BOOKS_ACTIONS.FetchPreviewBookFailed,
    (state, { error }): BooksState => ({
      ...state,
      previewError: error,
      isPreviewLoading: false,
    })
  ),
  on(
    BOOKS_ACTIONS.SetSearchPage,
    (state, { page }): BooksState => ({
      ...state,
      page,
    })
  ),
  on(
    BOOKS_ACTIONS.SetCategoryFilterType,
    (state, { categoryFilterType }): BooksState => ({
      ...state,
      categoryFilterType,
    })
  ),
  on(
    BOOKS_ACTIONS.SetFilterType,
    (state, { filterType }): BooksState => ({
      ...state,
      filterType,
    })
  ),
  on(
    BOOKS_ACTIONS.SetTotalsItems,
    (state, { totalItems }): BooksState => ({
      ...state,
      totalItems,
    })
  ),
  on(
    BOOKS_ACTIONS.AddFavoriteStatus,
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
    BOOKS_ACTIONS.RemoveFavoriteStatus,
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
