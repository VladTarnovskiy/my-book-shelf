import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBook } from '../../shared/models/book.model';
import * as FavoriteActions from './favorite.action';
import { selectFavoriteBooks } from './favorite.selector';

@Injectable({
  providedIn: 'root',
})
export class FavoriteFacade {
  favoriteBooks$ = this.store.select(selectFavoriteBooks);

  constructor(private store: Store) {}

  addFavoriteBook(book: IBook) {
    this.store.dispatch(FavoriteActions.AddFavoriteBook({ book }));
  }

  removeFavoriteBook(bookId: string) {
    this.store.dispatch(FavoriteActions.RemoveFavoriteBook({ bookId }));
  }
}
