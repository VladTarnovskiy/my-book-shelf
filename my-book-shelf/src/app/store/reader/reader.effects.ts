import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { SearchService } from '../../core/services/search/search.service';
import * as READER_BOOKS_ACTIONS from './reader.action';

@Injectable()
export class ReaderBookEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  fetchReaderBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(READER_BOOKS_ACTIONS.FetchBookForReader),
      switchMap(({ bookId }) =>
        this.searchService.getBook(bookId).pipe(
          map((book) =>
            READER_BOOKS_ACTIONS.FetchBookForReaderSuccess({ book })
          ),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.searchService.handleError(error);
            return of(
              READER_BOOKS_ACTIONS.FetchBookForReaderFailed({
                error: handleError,
              })
            );
          })
        )
      )
    );
  });
}
