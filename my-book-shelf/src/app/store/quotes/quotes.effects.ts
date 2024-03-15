import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { QuotesService } from '../../core/services/quotes/quotes.service';
import * as QUOTE_ACTIONS from './quotes.action';

@Injectable()
export class QuotesEffects {
  constructor(
    private actions$: Actions,
    private quotesService: QuotesService
  ) {}

  fetchQuote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QUOTE_ACTIONS.FetchQuote),
      switchMap(() =>
        this.quotesService.getTodayQuote().pipe(
          map((quote) => QUOTE_ACTIONS.FetchQuoteSuccess({ quote })),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.quotesService.handleError(error);
            return of(QUOTE_ACTIONS.FetchQuoteFailed({ error: handleError }));
          })
        )
      )
    );
  });
}
