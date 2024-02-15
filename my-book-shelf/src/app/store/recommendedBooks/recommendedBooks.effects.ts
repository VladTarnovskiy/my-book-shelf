import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as RecommendedBooksActions from './recommendedBooks.action';
import { SearchService } from '../../core/services/search/search.service';

@Injectable()
export class RecommendedBooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  fetchRecommendedBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecommendedBooksActions.FetchRecommendedBooks),
      switchMap(({ searchValue }) =>
        this.searchService.getRecBooks(searchValue).pipe(
          map((books) =>
            RecommendedBooksActions.FetchRecommendedBooksSuccess({ books })
          ),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.searchService.handleError(error);
            return of(
              RecommendedBooksActions.FetchRecommendedBooksFailed({
                error: handleError,
              })
            );
          })
        )
      )
    );
  });
}
