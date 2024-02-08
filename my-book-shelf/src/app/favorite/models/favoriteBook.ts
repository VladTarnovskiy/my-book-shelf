import { IBook } from '../../shared/models/book.model';

export type IFavoriteBook = IBook & {
  borrowedOn: string;
};
