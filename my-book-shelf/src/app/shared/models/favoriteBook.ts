import { IBook } from './book.model';

export type IFavoriteBook = IBook & {
  borrowedOn: string;
  submissionDate: string;
};
