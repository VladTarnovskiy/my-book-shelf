import { SearchBookSkeletonComponent } from './../../components/search-book-skeleton/search-book-skeleton.component';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { CommonModule } from '@angular/common';
import { ISearchOptions } from '../../interfaces/search';
import { BooksFacade } from '../../../store/books/books.facade';
import { FavoriteFacade } from '../../../store/favorite/favorite.facade';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  books$: Observable<IBook[]> = this.booksFacade.books$;
  isLoading$: Observable<boolean> = this.booksFacade.booksLoading$;
  searchOptions$: Observable<ISearchOptions> = this.booksFacade.searchOptions$;
  totalItems$: Observable<number> = this.booksFacade.searchTotalItems$;
  searchOptions!: ISearchOptions;
  books: IBook[] = [];
  skeletonItems = [...Array(10).keys()];
  isShowMore = false;
  subscription!: Subscription;
  constructor(
    private booksFacade: BooksFacade,
    private favoriteFacade: FavoriteFacade
  ) {}

  addToFavorite(book: IBook) {
    this.favoriteFacade.addFavoriteBook(book);
    this.addFavoriteStatus(book.id);
  }

  removeFromFavorite(bookId: string) {
    this.favoriteFacade.removeFavoriteBook(bookId);
    this.removeFavoriteStatus(bookId);
  }

  addFavoriteStatus(bookId: string) {
    this.booksFacade.addFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string) {
    this.booksFacade.removeFavoriteStatus(bookId);
  }

  getNextPage() {
    this.setNextPage();
    this.booksFacade.fetchBooks(
      this.searchOptions.searchValue,
      this.searchOptions.filterType,
      this.searchOptions.categoryFilterType,
      this.searchOptions.page
    );
  }

  setNextPage() {
    this.booksFacade.setSearchPage(this.searchOptions.page + 1);
  }

  ngOnInit() {
    this.subscription = this.books$.subscribe((books) => {
      if (books) {
        this.favoriteFacade.favoriteBooks$.subscribe((favBooks) => {
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
