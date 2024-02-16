import { createAction, props } from '@ngrx/store';
import { IUploadBook } from '../../my-books/models/upload';

const actionSource = '[My Book]';

export const AddMyBook = createAction(
  `${actionSource} Add Book`,
  props<{
    book: Omit<IUploadBook, 'borrowedOn' | 'submissionDate'>;
  }>()
);

export const RemoveMyBook = createAction(
  `${actionSource} Remove Book`,
  props<{ bookId: string }>()
);
