import { createAction, props } from '@ngrx/store';

import { IQuote } from '../../shared/models/quote';

const actionSource = '[Quotes]';

export const FetchQuote = createAction(`${actionSource} Fetch`);

export const FetchQuoteSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ quote: IQuote }>()
);

export const FetchQuoteFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: string }>()
);
