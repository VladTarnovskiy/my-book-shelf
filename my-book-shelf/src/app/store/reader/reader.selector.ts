import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from '../router/router.selectors';
import { ReaderBookState } from './reader.reducer';

export const selectReaderBooksStore =
  createFeatureSelector<ReaderBookState>('bookReader');

export const selectReaderBook = createSelector(
  selectReaderBooksStore,
  (state: ReaderBookState) => state.book
);

export const selectReaderBookLoader = createSelector(
  selectReaderBooksStore,
  (state: ReaderBookState) => state.isLoading
);

export const selectReaderBookId = createSelector(
  selectRouteParams,
  ({ readerId }) => {
    return readerId as string;
  }
);
