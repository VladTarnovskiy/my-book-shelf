import { createReducer, on } from '@ngrx/store';
import * as MY_BOOKS_ACTIONS from './my-books.action';
import { IUploadBook } from '../../my-books/models/upload';

export interface MyBooksState {
  books: IUploadBook[];
  selectedBook: IUploadBook | null;
}

export const initialState: MyBooksState = {
  books: [],
  selectedBook: null,
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
    MY_BOOKS_ACTIONS.SelectMyBook,
    (state, { bookId }): MyBooksState => ({
      ...state,
      selectedBook: [...state.books].find((book) => book.id === bookId) || null,
    })
  )
);
