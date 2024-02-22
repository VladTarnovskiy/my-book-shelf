import { createReducer, on } from '@ngrx/store';
import * as BOOKS_ACTIONS from './books.action';
import { IBook } from '../../shared/models/book.model';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../core/interfaces/filters';

export interface BooksState {
  books: IBook[];
  recentBooks: IBook[];
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
  recentBooks: [],
  totalItems: 0,
  previewBook: null,
  page: 1,
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
      if (page === 1) {
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
    if (page === 1) {
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
  on(BOOKS_ACTIONS.AddRecentBook, (state, { recentBook }): BooksState => {
    const hasRecentBook = state.recentBooks
      .map((book) => book.id)
      .includes(recentBook.id);
    if (hasRecentBook) {
      return {
        ...state,
      };
    }
    if (state.recentBooks.length === 10) {
      return {
        ...state,
        recentBooks: [...state.recentBooks.slice(1), recentBook],
      };
    } else {
      return {
        ...state,
        recentBooks: [...state.recentBooks, recentBook],
      };
    }
  }),
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
