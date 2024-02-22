import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReaderBookState } from './api-reader.reducer';
import { selectRouteParams } from '../router.selectors';

export const selectReaderBooksStore =
  createFeatureSelector<ReaderBookState>('readerBook');

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
