import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as BooksActions from '../actions/books.action';
import { SearchService } from '../../../search/services/search/search.service';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  fetchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.FetchBooks),
      switchMap(({ searchValue, filterType, categoryFilterType, page }) =>
        this.searchService
          .getBooks(searchValue, filterType, categoryFilterType, page)
          .pipe(
            map((books) => BooksActions.FetchBooksSuccess({ books, page })),
            catchError((error: HttpErrorResponse) => {
              const handleError = this.searchService.handleError(error);
              return of(BooksActions.FetchBooksFailed({ error: handleError }));
            })
          )
      )
    );
  });

  fetchBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.FetchPreviewBook),
      switchMap(({ bookId }) =>
        this.searchService.getBook(bookId).pipe(
          map((previewBook) =>
            BooksActions.FetchPreviewBookSuccess({ previewBook })
          ),
          catchError((error: HttpErrorResponse) => {
            const handleError = this.searchService.handleError(error);
            return of(
              BooksActions.FetchPreviewBookFailed({ error: handleError })
            );
          })
        )
      )
    );
  });
}
