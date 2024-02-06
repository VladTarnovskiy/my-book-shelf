import { createAction, props } from '@ngrx/store';
import { IBook } from '../../../shared/models/book.model';

const actionSource = '[Favorite]';

export const AddFavoriteBook = createAction(
  `${actionSource} Add Book`,
  props<{
    book: IBook;
  }>()
);

export const RemoveFavoriteBook = createAction(
  `${actionSource} Remove Book`,
  props<{ id: string }>()
);
