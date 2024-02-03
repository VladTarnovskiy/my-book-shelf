import { createAction, props } from '@ngrx/store';
import { IBook } from '../../../shared/models/book.model';

const actionSource = '[Books]';

export const FetchBooks = createAction(
  `${actionSource} Fetch`,
  props<{ searchValue: string }>()
);

export const FetchBooksSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ books: IBook[] }>()
);

export const FetchBooksFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: string }>()
);

// export const SetSearchValue = createAction(
//   `${actionSource} Set Search Value`,
//   props<{ searchValue: string }>()
// );
