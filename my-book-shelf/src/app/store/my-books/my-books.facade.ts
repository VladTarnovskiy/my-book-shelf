import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MyBookActions from './my-books.action';
import { selectMyBooks } from './my-books.selector';
import { IUploadBook } from '../../my-books/models/upload';

@Injectable({
  providedIn: 'root',
})
export class MyBooksFacade {
  myBooks$ = this.store.select(selectMyBooks);

  constructor(private store: Store) {}

  addMyBook(book: Omit<IUploadBook, 'borrowedOn' | 'submissionDate'>) {
    this.store.dispatch(MyBookActions.AddMyBook({ book }));
  }

  removeMyBook(bookId: string) {
    this.store.dispatch(MyBookActions.RemoveMyBook({ bookId }));
  }
}
