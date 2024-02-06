import { createReducer, on } from '@ngrx/store';
import * as FavoriteBooksActions from '../actions/favorite.action';
import { IFavoriteBook } from '../../../favorite/models/favoriteBook';

export interface FavoriteBooksState {
  books: IFavoriteBook[];
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
      books: [...state.books].concat({
        ...book,
        borrowedOn: String(Date.now().toLocaleString()),
      }),
    })
  ),
  on(
    FavoriteBooksActions.RemoveFavoriteBook,
    (state, { bookId }): FavoriteBooksState => ({
      ...state,
      books: [...state.books].filter((book) => book.id !== bookId),
    })
  )
);
