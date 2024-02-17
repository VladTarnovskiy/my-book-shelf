import { createReducer, on } from '@ngrx/store';
import * as QUOTE_ACTIONS from './quotes.action';
import { IQuote } from '../../search/models/quote';

export interface QuotesState {
  quote: IQuote | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: QuotesState = {
  quote: null,
  isLoading: false,
  error: null,
};

export const quotesReducer = createReducer(
  initialState,
  on(
    QUOTE_ACTIONS.FetchQuote,
    (state): QuotesState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    QUOTE_ACTIONS.FetchQuoteSuccess,
    (state, { quote }): QuotesState => ({
      ...state,
      isLoading: false,
      quote,
    })
  ),
  on(
    QUOTE_ACTIONS.FetchQuoteFailed,
    (state, { error }): QuotesState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
