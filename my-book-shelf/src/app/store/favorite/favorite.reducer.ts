import { createReducer, on } from '@ngrx/store';
import * as FAVORITE_BOOKS_ACTIONS from './favorite.action';
import { IFavoriteBook } from '../../favorite/models/favoriteBook';

export interface FavoriteBooksState {
  books: IFavoriteBook[];
}

export const initialState: FavoriteBooksState = {
  books: [],
};

export const favoriteBooksReducer = createReducer(
  initialState,
  on(
    FAVORITE_BOOKS_ACTIONS.AddFavoriteBook,
    (state, { book }): FavoriteBooksState => ({
      ...state,
      books: [...state.books].concat({
        ...book,
        borrowedOn: Date.now().toString(),
        submissionDate: String(Date.now() + 259200000),
      }),
    })
  ),
  on(
    FAVORITE_BOOKS_ACTIONS.RemoveFavoriteBook,
    (state, { bookId }): FavoriteBooksState => ({
      ...state,
      books: [...state.books].filter((book) => book.id !== bookId),
    })
  )
);
