import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '@core/services/toaster';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { SearchService } from '../../core/services/search/search.service';
import * as BOOKS_ACTIONS from './books.action';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private toasterService: ToasterService
  ) {}

  fetchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BOOKS_ACTIONS.FetchBooks),
      switchMap(({ searchValue, filterType, categoryFilterType, page }) =>
        this.searchService
          .getBooks({ searchValue, filterType, categoryFilterType, page })
          .pipe(
            map((booksInfo) =>
              BOOKS_ACTIONS.FetchBooksSuccess({
                books: booksInfo.books,
                totalBooks: booksInfo.totalBooks,
                page,
              })
            ),
            catchError((error: HttpErrorResponse) => {
              this.toasterService.showHttpsError(error);
              return of(
                BOOKS_ACTIONS.FetchBooksFailed({
                  error: error,
                })
              );
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
            this.toasterService.showHttpsError(error);
            return of(
              BOOKS_ACTIONS.FetchPreviewBookFailed({
                error: error,
              })
            );
          })
        )
      )
    );
  });
}
