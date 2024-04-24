import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '@core/services/toaster';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { SearchService } from '../../core/services/search/search.service';
import * as RECOMMENDED_BOOKS_ACTIONS from './recommendedBooks.action';

@Injectable()
export class RecommendedBooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private toasterService: ToasterService
  ) {}

  fetchRecommendedBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RECOMMENDED_BOOKS_ACTIONS.FetchRecommendedBooks),
      switchMap(({ searchValue }) =>
        this.searchService.getRecBooks(searchValue).pipe(
          map((books) =>
            RECOMMENDED_BOOKS_ACTIONS.FetchRecommendedBooksSuccess({ books })
          ),
          catchError((error: HttpErrorResponse) => {
            this.toasterService.showHttpsError(error);
            return of(
              RECOMMENDED_BOOKS_ACTIONS.FetchRecommendedBooksFailed({
                error: error,
              })
            );
          })
        )
      )
    );
  });
}
