import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { IBook } from '../../shared/models/book';

const actionSource = '[Recommended Books]';

export const FetchRecommendedBooks = createAction(
  `${actionSource} Fetch`,
  props<{
    searchValue: string;
  }>()
);

export const FetchRecommendedBooksSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ books: IBook[] }>()
);

export const FetchRecommendedBooksFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: HttpErrorResponse }>()
);
