import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from '../router/router.selectors';
import { BooksState } from './books.reducer';

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

export const selectSearchPage = createSelector(
  selectBooksStore,
  (state: BooksState) => state.page
);

export const selectBookFilterCategoryType = createSelector(
  selectBooksStore,
  (state: BooksState) => state.categoryFilterType
);

export const selectSearchTotalBooks = createSelector(
  selectBooksStore,
  (state: BooksState) => state.totalBooks
);

export const selectSearchOptions = createSelector(
  selectBooksStore,
  (state: BooksState) => {
    return {
      page: state.page,
      filterType: state.filterType,
      categoryFilterType: state.categoryFilterType,
      searchValue: state.searchValue,
    };
  }
);

export const selectPreviewBook = createSelector(
  selectBooksStore,
  (state: BooksState) => state.previewBook
);

export const selectPreviewBookLoader = createSelector(
  selectBooksStore,
  (state: BooksState) => state.isPreviewLoading
);

export const selectBookId = createSelector(
  selectRouteParams,
  ({ previewId }) => {
    return previewId as string;
  }
);

export const selectMyBookId = createSelector(
  selectRouteParams,
  ({ myBookId }) => {
    return myBookId as string;
  }
);
