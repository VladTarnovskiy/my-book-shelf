import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { SearchService } from '../../core/services/search/search.service';
import * as BOOKS_ACTIONS from './books.action';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  fetchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BOOKS_ACTIONS.FetchBooks),
      switchMap(({ searchValue, filterType, categoryFilterType, page }) =>
        this.searchService
          .getBooks({ searchValue, filterType, categoryFilterType, page })
          .pipe(
            map((books) => BOOKS_ACTIONS.FetchBooksSuccess({ books, page })),
            catchError((error: HttpErrorResponse) => {
              const handleError = this.searchService.handleError(error);
              return of(BOOKS_ACTIONS.FetchBooksFailed({ error: handleError }));
            })
          )
      )
    );
  });

  fetchBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BOOKS_ACTIONS.FetchPreviewBook),
      switchMap(({ bookId }) =>
        this.searchService.getBook(bookId).pipe(
          map((previewBook) =>
            BOOKS_ACTIONS.FetchPreviewBookSuccess({ previewBook })
          ),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.searchService.handleError(error);
            return of(
              BOOKS_ACTIONS.FetchPreviewBookFailed({ error: handleError })
            );
          })
        )
      )
    );
  });
}
