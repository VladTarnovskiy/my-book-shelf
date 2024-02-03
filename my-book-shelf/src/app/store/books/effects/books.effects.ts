import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, exhaustMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as BooksActions from '../actions/books.action';
import { SearchService } from '../../../shared/services/search/search.service';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  fetchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.FetchBooks),
      exhaustMap(({ searchValue }) =>
        this.searchService.getBooks(searchValue).pipe(
          map((books) => BooksActions.FetchBooksSuccess({ books })),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.searchService.handleError(error);
            return of(BooksActions.FetchBooksFailed({ error: handleError }));
          })
        )
      )
    );
  });
}
