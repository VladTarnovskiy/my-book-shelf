import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MY_BOOKS_ACTIONS from './my-books.action';
import {
  selectMyBookForId,
  selectMyBooks,
  selectMyBooksFavorite,
} from './my-books.selector';
import { IUploadBook } from '../../my-books/models/upload';

@Injectable({
  providedIn: 'root',
})
export class MyBooksFacade {
  myBooks$ = this.store.select(selectMyBooks);
  selectedBook$ = this.store.select(selectMyBookForId);
  selectedMyBooksFavorite$ = this.store.select(selectMyBooksFavorite);

  constructor(private store: Store) {}

  addMyBook(book: Omit<IUploadBook, 'borrowedOn' | 'submissionDate'>) {
    this.store.dispatch(MY_BOOKS_ACTIONS.AddMyBook({ book }));
  }

  removeMyBook(bookId: string) {
    this.store.dispatch(MY_BOOKS_ACTIONS.RemoveMyBook({ bookId }));
  }

  addMyBookToFavorite(bookId: string) {
    this.store.dispatch(MY_BOOKS_ACTIONS.AddMyBookToFavorite({ bookId }));
  }

  removeMyBookFromFavorite(bookId: string) {
    this.store.dispatch(MY_BOOKS_ACTIONS.RemoveMyBookFromFavorite({ bookId }));
  }
}
