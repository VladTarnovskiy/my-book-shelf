import { createReducer, on } from '@ngrx/store';
import * as MyBooksActions from './my-books.action';
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
    MyBooksActions.AddMyBook,
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
    MyBooksActions.RemoveMyBook,
    (state, { bookId }): MyBooksState => ({
      ...state,
      books: [...state.books].filter((book) => book.id !== bookId),
    })
  )
);
