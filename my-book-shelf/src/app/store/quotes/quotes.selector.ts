import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuotesState } from './quotes.reducer';

export const selectQuotesStore = createFeatureSelector<QuotesState>('quotes');

export const selectQuote = createSelector(
  selectQuotesStore,
  (state: QuotesState) => state.quote
);

export const selectQuoteIsLoading = createSelector(
  selectQuotesStore,
  (state: QuotesState) => state.isLoading
);

export const selectQuoteError = createSelector(
  selectQuotesStore,
  (state: QuotesState) => state.error
);
