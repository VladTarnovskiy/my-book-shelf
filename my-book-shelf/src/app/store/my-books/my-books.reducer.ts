import { createReducer, on } from '@ngrx/store';
import * as MY_BOOKS_ACTIONS from './my-books.action';
import { IUploadBook } from '../../my-books/models/upload';

export interface MyBooksState {
  books: IUploadBook[];
}

export const initialState: MyBooksState = {
  books: [],
};

export const myBooksReducer = createReducer(
  initialState,
  on(
    MY_BOOKS_ACTIONS.AddMyBook,
    (state, { book }): MyBooksState => ({
      ...state,
      books: [...state.books].concat({
        ...book,
        borrowedOn: Date.now().toString(),
        submissionDate: String(Date.now() + 259200000),
      }),
    })
  ),
  on(
    MY_BOOKS_ACTIONS.RemoveMyBook,
    (state, { bookId }): MyBooksState => ({
      ...state,
      books: [...state.books].filter((book) => book.id !== bookId),
    })
  ),
  on(
    MY_BOOKS_ACTIONS.AddMyBookToFavorite,
    (state, { bookId }): MyBooksState => ({
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
    MY_BOOKS_ACTIONS.RemoveMyBookFromFavorite,
    (state, { bookId }): MyBooksState => ({
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
