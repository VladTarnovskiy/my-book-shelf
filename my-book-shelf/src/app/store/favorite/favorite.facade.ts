import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBook } from '../../shared/models/book.model';
import * as FAVORITE_BOOKS_ACTIONS from './favorite.action';
import { selectFavoriteBooks } from './favorite.selector';

@Injectable({
  providedIn: 'root',
})
export class FavoriteFacade {
  favoriteBooks$ = this.store.select(selectFavoriteBooks);

  constructor(private store: Store) {}

  addFavoriteBook(book: IBook) {
    this.store.dispatch(FAVORITE_BOOKS_ACTIONS.AddFavoriteBook({ book }));
  }

  removeFavoriteBook(bookId: string) {
    this.store.dispatch(FAVORITE_BOOKS_ACTIONS.RemoveFavoriteBook({ bookId }));
  }
}
