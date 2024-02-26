import { createAction, props } from '@ngrx/store';
import { IUploadBook } from '../../my-books/models/upload';

const actionSource = '[My Book]';

export const AddMyBook = createAction(
  `${actionSource} Add Book`,
  props<{
    book: IUploadBook;
  }>()
);

export const RemoveMyBook = createAction(
  `${actionSource} Remove Book`,
  props<{ bookId: string }>()
);

export const AddMyBookToFavorite = createAction(
  `${actionSource} Add Book to favorite`,
  props<{ bookId: string }>()
);

export const RemoveMyBookFromFavorite = createAction(
  `${actionSource} Remove Book to favorite`,
  props<{ bookId: string }>()
);
