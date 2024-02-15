import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectRecommendedBooks,
  selectRecommendedBooksError,
  selectRecommendedBooksIsLoading,
} from './recommendedBooks.selector';
import * as RecommendedBooksActions from './recommendedBooks.action';

@Injectable({
  providedIn: 'root',
})
export class RecommendedBooksFacade {
  recommendedBooks$ = this.store.select(selectRecommendedBooks);
  recBooksIsLoading$ = this.store.select(selectRecommendedBooksIsLoading);
  recBooksError$ = this.store.select(selectRecommendedBooksError);

  constructor(private store: Store) {}

  fetchRecommendedBooks(searchValue: string) {
    this.store.dispatch(
      RecommendedBooksActions.FetchRecommendedBooks({
        searchValue,
      })
    );
  }
}
