import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBookFilterCategoryType,
  selectBookId,
  selectBooks,
  selectBooksLoading,
  selectPreviewBook,
  selectPreviewBookLoader,
  selectSearchOptions,
  selectSearchPage,
  selectSearchTotalItems,
  selectSearchValue,
} from './books.selector';
import {
  FilterTypesKeys,
  CategoryFilterKeys,
} from '../../shared/interfaces/filters';
import * as BOOKS_ACTIONS from './books.action';
import { IBooksSearchParams } from '../../shared/interfaces/bookParams';

@Injectable({
  providedIn: 'root',
})
export class BooksFacade {
  books$ = this.store.select(selectBooks);
  booksLoading$ = this.store.select(selectBooksLoading);
  searchValue$ = this.store.select(selectSearchValue);
  searchPage$ = this.store.select(selectSearchPage);
  filterCategoryType$ = this.store.select(selectBookFilterCategoryType);
  searchTotalItems$ = this.store.select(selectSearchTotalItems);
  searchOptions$ = this.store.select(selectSearchOptions);
  previewBook$ = this.store.select(selectPreviewBook);
  previewBookLoader$ = this.store.select(selectPreviewBookLoader);
  previewBookId$ = this.store.select(selectBookId);

  constructor(private store: Store) {}

  fetchBooks({
    searchValue,
    filterType,
    categoryFilterType,
    page,
  }: IBooksSearchParams) {
    this.store.dispatch(
      BOOKS_ACTIONS.FetchBooks({
        searchValue,
        filterType,
        categoryFilterType,
        page,
      })
    );
  }

  setFilterType(filterType: FilterTypesKeys) {
    this.store.dispatch(BOOKS_ACTIONS.SetFilterType({ filterType }));
  }

  setCategoryFilterType(categoryFilterType: CategoryFilterKeys) {
    this.store.dispatch(
      BOOKS_ACTIONS.SetCategoryFilterType({ categoryFilterType })
    );
  }

  setSearchPage(page: number) {
    this.store.dispatch(BOOKS_ACTIONS.SetSearchPage({ page }));
  }

  setTotalsItems(totalItems: number) {
    this.store.dispatch(BOOKS_ACTIONS.SetTotalsItems({ totalItems }));
  }

  addFavoriteStatus(bookId: string) {
    this.store.dispatch(BOOKS_ACTIONS.AddFavoriteStatus({ bookId }));
  }

  removeFavoriteStatus(bookId: string) {
    this.store.dispatch(BOOKS_ACTIONS.RemoveFavoriteStatus({ bookId }));
  }

  fetchPreviewBook(bookId: string) {
    this.store.dispatch(BOOKS_ACTIONS.FetchPreviewBook({ bookId }));
  }
}
