import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QUOTE_ACTIONS from './quotes.action';
import {
  selectQuote,
  selectQuoteIsLoading,
  selectQuoteError,
} from './quotes.selector';

@Injectable({
  providedIn: 'root',
})
export class QuotesFacade {
  quote$ = this.store.select(selectQuote);
  isLoading$ = this.store.select(selectQuoteIsLoading);
  error$ = this.store.select(selectQuoteError);

  constructor(private store: Store) {}

  fetchQuote() {
    this.store.dispatch(QUOTE_ACTIONS.FetchQuote());
  }
}
