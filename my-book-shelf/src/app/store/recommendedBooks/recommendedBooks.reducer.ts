import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './recommendedBooks.action';
import { IBook } from '../../shared/models/book.model';

export interface RecommendedBooksState {
  books: IBook[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: RecommendedBooksState = {
  books: [],
  isLoading: false,
  error: null,
};

export const recommendedBooksReducer = createReducer(
  initialState,
  on(
    BooksActions.FetchRecommendedBooks,
    (state): RecommendedBooksState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    BooksActions.FetchRecommendedBooksSuccess,
    (state, { books }): RecommendedBooksState => {
      return {
        ...state,
        books,
        isLoading: false,
      };
    }
  ),
  on(
    BooksActions.FetchRecommendedBooksFailed,
    (state, { error }): RecommendedBooksState => ({
      ...state,
      error,
      books: [],
      isLoading: false,
    })
  )
);
