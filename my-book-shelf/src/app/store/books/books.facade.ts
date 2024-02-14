import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBookFilterCategoryType,
  selectBookId,
  selectBooks,
  selectBooksLoading,
  selectPreviewBook,
  selectPreviewBookLoader,
  selectRecentBooks,
  selectSearchOptions,
  selectSearchPage,
  selectSearchTotalItems,
  selectSearchValue,
} from './books.selector';
import {
  FilterTypesKeys,
  CategoryFilterKeys,
} from '../../shared/interfaces/filters';
import { IBook } from '../../shared/models/book.model';
import * as BooksActions from './books.action';

@Injectable({
  providedIn: 'root',
})
export class BooksFacade {
  books$ = this.store.select(selectBooks);
  recentBooks$ = this.store.select(selectRecentBooks);
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

  fetchBooks(
    searchValue: string,
    filterType: FilterTypesKeys,
    categoryFilterType: CategoryFilterKeys,
    page: number
  ) {
    this.store.dispatch(
      BooksActions.FetchBooks({
        searchValue,
        filterType,
        categoryFilterType,
        page,
      })
    );
  }

  addRecentBook(recentBook: IBook) {
    this.store.dispatch(BooksActions.AddRecentBook({ recentBook }));
  }

  setFilterType(filterType: FilterTypesKeys) {
    this.store.dispatch(BooksActions.SetFilterType({ filterType }));
  }

  setCategoryFilterType(categoryFilterType: CategoryFilterKeys) {
    this.store.dispatch(
      BooksActions.SetCategoryFilterType({ categoryFilterType })
    );
  }

  setSearchPage(page: number) {
    this.store.dispatch(BooksActions.SetSearchPage({ page }));
  }

  setTotalsItems(totalItems: number) {
    this.store.dispatch(BooksActions.SetTotalsItems({ totalItems }));
  }

  addFavoriteStatus(bookId: string) {
    this.store.dispatch(BooksActions.AddFavoriteStatus({ bookId }));
  }

  removeFavoriteStatus(bookId: string) {
    this.store.dispatch(BooksActions.RemoveFavoriteStatus({ bookId }));
  }

  fetchPreviewBook(bookId: string) {
    this.store.dispatch(BooksActions.FetchPreviewBook({ bookId }));
  }
}
