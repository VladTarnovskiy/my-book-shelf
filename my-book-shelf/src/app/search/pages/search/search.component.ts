import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { selectBooks } from '../../../store/books/selectors/books.selector';
import { CommonModule } from '@angular/common';
import {
  AddFavoriteBook,
  RemoveFavoriteBook,
} from '../../../store/favorite/actions/favorite.action';
import {
  AddFavoriteStatus,
  RemoveFavoriteStatus,
} from '../../../store/books/actions/books.action';
import { selectFavoriteBooks } from '../../../store/favorite/selectors/favorite.selector';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CategoryFilterComponent, SearchBookComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  books$: Observable<IBook[] | null> = this.store.select(selectBooks);
  books: IBook[] = [];
  subscription!: Subscription;
  constructor(private store: Store) {}

  addToFavorite(book: IBook) {
    this.store.dispatch(AddFavoriteBook({ book }));
    this.addFavoriteStatus(book.id);
  }

  removeFromFavorite(bookId: string) {
    this.store.dispatch(RemoveFavoriteBook({ bookId }));
    this.removeFavoriteStatus(bookId);
  }

  addFavoriteStatus(bookId: string) {
    this.store.dispatch(AddFavoriteStatus({ bookId }));
  }

  removeFavoriteStatus(bookId: string) {
    this.store.dispatch(RemoveFavoriteStatus({ bookId }));
  }

  ngOnInit() {
    this.subscription = this.books$.subscribe((books) => {
      if (books) {
        this.store.select(selectFavoriteBooks).subscribe((favBooks) => {
          const favIDs = favBooks.map((favBook) => favBook.id);
          const checkedBooks = books?.map((book) => {
            if (favIDs.includes(book.id)) {
              return { ...book, isFavorite: true };
            } else {
              return book;
            }
          });
          this.books = checkedBooks;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
