import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';
import { selectRouteParams } from '../router.selectors';

export const selectBooksStore = createFeatureSelector<BooksState>('books');
export const selectBooks = createSelector(
  selectBooksStore,
  (state: BooksState) => state.books
);

export const selectRecentBooks = createSelector(
  selectBooksStore,
  (state: BooksState) => state.recentBooks
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

export const selectSearchTotalItems = createSelector(
  selectBooksStore,
  (state: BooksState) => state.totalItems
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

export const selectISBNId = createSelector(
  selectBooksStore,
  selectRouteParams,
  (store, { isbnId }) => {
    const id = isbnId as string;
    const book = store.books.find((book) => book.ISBN === id);

    return book || null;
  }
);
