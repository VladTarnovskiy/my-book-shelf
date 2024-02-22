import { createAction, props } from '@ngrx/store';
import { IBook } from '../../shared/models/book.model';

const actionSource = '[Api Reader]';

export const FetchBookForReader = createAction(
  `${actionSource} Fetch Book`,
  props<{
    bookId: string;
  }>()
);

export const FetchBookForReaderSuccess = createAction(
  `${actionSource} Fetch Book Success`,
  props<{ book: IBook }>()
);

export const FetchBookForReaderFailed = createAction(
  `${actionSource} Fetch Book Failed`,
  props<{ error: string }>()
);
