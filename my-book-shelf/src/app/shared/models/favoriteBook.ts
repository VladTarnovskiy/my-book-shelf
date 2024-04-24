import { IBook } from './book';

export type IFavoriteBook = IBook & {
  borrowedOn: string;
  submissionDate: string;
};
