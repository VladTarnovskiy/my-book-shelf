import { createReducer, on } from '@ngrx/store';

import { IBook } from '../../shared/models/book';
import * as READER_BOOKS_ACTIONS from './reader.action';

export interface ReaderBookState {
  book: IBook | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ReaderBookState = {
  book: null,
  isLoading: false,
  error: null,
};

export const readerBookReducer = createReducer(
  initialState,

  on(
    READER_BOOKS_ACTIONS.FetchBookForReader,
    (state): ReaderBookState => ({
      ...state,
      book: null,
      isLoading: true,
    })
  ),
  on(
    READER_BOOKS_ACTIONS.FetchBookForReaderSuccess,
    (state, { book }): ReaderBookState => ({
      ...state,
      book,
      isLoading: false,
    })
  ),
  on(
    READER_BOOKS_ACTIONS.FetchBookForReaderFailed,
    (state, { error }): ReaderBookState => ({
      ...state,
      error: error,
      isLoading: false,
    })
  )
);
