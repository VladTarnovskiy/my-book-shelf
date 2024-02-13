import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.action';
import { IBook } from '../../shared/models/book.model';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../shared/interfaces/filters';

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
    BooksActions.FetchBooks,
    (state, { searchValue, filterType, categoryFilterType }): BooksState => ({
      ...state,
      searchValue,
      filterType,
      categoryFilterType,
      isLoading: true,
    })
  ),
  on(BooksActions.FetchBooksSuccess, (state, { books, page }): BooksState => {
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
    BooksActions.FetchBooksFailed,
    (state, { error }): BooksState => ({
      ...state,
      error,
      books: [],
      isLoading: false,
    })
  ),
  on(
    BooksActions.FetchPreviewBook,
    (state): BooksState => ({
      ...state,
      isPreviewLoading: true,
    })
  ),
  on(
    BooksActions.FetchPreviewBookSuccess,
    (state, { previewBook }): BooksState => ({
      ...state,
      previewBook,
      isPreviewLoading: false,
    })
  ),
  on(
    BooksActions.FetchPreviewBookFailed,
    (state, { error }): BooksState => ({
      ...state,
      previewError: error,
      isPreviewLoading: false,
    })
  ),
  on(BooksActions.AddRecentBook, (state, { recentBook }): BooksState => {
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
    BooksActions.SetSearchPage,
    (state, { page }): BooksState => ({
      ...state,
      page,
    })
  ),
  on(
    BooksActions.SetCategoryFilterType,
    (state, { categoryFilterType }): BooksState => ({
      ...state,
      categoryFilterType,
    })
  ),
  on(
    BooksActions.SetFilterType,
    (state, { filterType }): BooksState => ({
      ...state,
      filterType,
    })
  ),
  on(
    BooksActions.SetTotalsItems,
    (state, { totalItems }): BooksState => ({
      ...state,
      totalItems,
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
