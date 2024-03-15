import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as READER_BOOKS_ACTIONS from './reader.action';
import {
  selectReaderBook,
  selectReaderBookId,
  selectReaderBookLoader,
} from './reader.selector';

@Injectable({
  providedIn: 'root',
})
export class ReaderBookFacade {
  readerBook$ = this.store.select(selectReaderBook);
  readerBookLoader$ = this.store.select(selectReaderBookLoader);
  readerBookId$ = this.store.select(selectReaderBookId);

  constructor(private store: Store) {}

  fetchReaderBook(bookId: string) {
    this.store.dispatch(READER_BOOKS_ACTIONS.FetchBookForReader({ bookId }));
  }
}
