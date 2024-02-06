import { createReducer, on } from '@ngrx/store';
import * as FavoriteBooksActions from '../actions/books.action';
import { IBook } from '../../../shared/models/book.model';

export interface FavoriteBooksState {
  books: IBook[];
}

export const initialState: FavoriteBooksState = {
  books: [],
};

export const favoriteBooksReducer = createReducer(
  initialState,
  on(
    FavoriteBooksActions.AddFavoriteBook,
    (state, { book }): FavoriteBooksState => ({
      ...state,
      books: [...state.books].concat(book),
    })
  ),
  on(
    FavoriteBooksActions.RemoveFavoriteBook,
    (state, { id }): FavoriteBooksState => ({
      ...state,
      books: [...state.books].filter((book) => book.id !== id),
    })
  )
);
