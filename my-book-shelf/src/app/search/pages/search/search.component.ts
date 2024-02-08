import { SearchBookSkeletonComponent } from './../../components/search-book-skeleton/search-book-skeleton.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import {
  selectBooks,
  selectBooksLoading,
  selectSearchOptions,
  selectSearchTotalItems,
} from '../../../store/books/selectors/books.selector';
import { CommonModule } from '@angular/common';
import {
  AddFavoriteBook,
  RemoveFavoriteBook,
} from '../../../store/favorite/actions/favorite.action';
import {
  AddFavoriteStatus,
  FetchBooks,
  RemoveFavoriteStatus,
  SetSearchPage,
} from '../../../store/books/actions/books.action';
import { selectFavoriteBooks } from '../../../store/favorite/selectors/favorite.selector';
import { ISearchOptions } from '../../interfaces/search';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CategoryFilterComponent,
    SearchBookComponent,
    CommonModule,
    SearchBookSkeletonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  books$: Observable<IBook[]> = this.store.select(selectBooks);
  isLoading$: Observable<boolean> = this.store.select(selectBooksLoading);
  searchOptions$: Observable<ISearchOptions> =
    this.store.select(selectSearchOptions);
  totalItems$: Observable<number> = this.store.select(selectSearchTotalItems);
  searchOptions!: ISearchOptions;
  books: IBook[] = [];
  skeletonItems = [...Array(10).keys()];
  isShowMore = false;
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

  getNextPage() {
    this.setNextPage();
    this.store.dispatch(
      FetchBooks({
        searchValue: this.searchOptions.searchValue,
        filterType: this.searchOptions.filterType,
        categoryFilterType: this.searchOptions.categoryFilterType,
        page: this.searchOptions.page,
      })
    );
  }

  setNextPage() {
    this.store.dispatch(SetSearchPage({ page: this.searchOptions.page + 1 }));
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

    const childSubscription = this.searchOptions$.subscribe((options) => {
      this.searchOptions = options;
    });

    const secondChildSubscription = this.totalItems$.subscribe((totalItems) => {
      if (totalItems - 10 * this.searchOptions.page > 10) {
        this.isShowMore = true;
      } else {
        this.isShowMore = false;
      }
    });

    this.subscription.add(childSubscription);
    this.subscription.add(secondChildSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
