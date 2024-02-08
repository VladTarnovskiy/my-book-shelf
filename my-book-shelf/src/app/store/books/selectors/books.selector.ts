import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from '../reducers/books.reducer';
import { selectRouteParams } from '../../router.selectors';

export const selectBooksStore = createFeatureSelector<BooksState>('books');
export const selectBooks = createSelector(
  selectBooksStore,
  (state: BooksState) => state.books
);

export const selectBooksLoading = createSelector(
  selectBooksStore,
  (state: BooksState) => state.isLoading
);

export const selectSearchValue = createSelector(
  selectBooksStore,
  (state: BooksState) => state.searchValue
);

export const selectBookFilterType = createSelector(
  selectBooksStore,
  (state: BooksState) => state.filterType
);

export const selectBookFilterCategoryType = createSelector(
  selectBooksStore,
  (state: BooksState) => state.filterCategoryType
);

export const selectPreviewBook = createSelector(
  selectBooksStore,
  (state: BooksState) => state.previewBook
);

export const selectBookId = createSelector(
  selectRouteParams,
  ({ previewId }) => {
    return previewId;
  }
);
