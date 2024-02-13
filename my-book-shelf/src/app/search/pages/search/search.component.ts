import { SearchBookSkeletonComponent } from './../../components/search-book-skeleton/search-book-skeleton.component';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';
import { Observable, takeUntil } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { CommonModule } from '@angular/common';
import { ISearchOptions } from '../../interfaces/search';
import { BooksFacade } from '../../../store/books/books.facade';
import { FavoriteFacade } from '../../../store/favorite/favorite.facade';
import { DestroyDirective } from '../../../core/directives/destroy';

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
  hostDirectives: [DestroyDirective],
})
export class SearchComponent implements OnInit {
  books$: Observable<IBook[]> = this.booksFacade.books$;
  isLoading$: Observable<boolean> = this.booksFacade.booksLoading$;
  searchOptions$: Observable<ISearchOptions> = this.booksFacade.searchOptions$;
  totalItems$: Observable<number> = this.booksFacade.searchTotalItems$;
  searchOptions!: ISearchOptions;
  books: IBook[] = [];
  skeletonItems = [...Array(10).keys()];
  isShowMore = false;
  destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private booksFacade: BooksFacade,
    private favoriteFacade: FavoriteFacade
  ) {}

  addToFavorite(book: IBook): void {
    this.favoriteFacade.addFavoriteBook(book);
    this.addFavoriteStatus(book.id);
  }

  removeFromFavorite(bookId: string): void {
    this.favoriteFacade.removeFavoriteBook(bookId);
    this.removeFavoriteStatus(bookId);
  }

  addFavoriteStatus(bookId: string): void {
    this.booksFacade.addFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string): void {
    this.booksFacade.removeFavoriteStatus(bookId);
  }

  getNextPage(): void {
    this.setNextPage();
    this.booksFacade.fetchBooks(
      this.searchOptions.searchValue,
      this.searchOptions.filterType,
      this.searchOptions.categoryFilterType,
      this.searchOptions.page
    );
  }

  setNextPage(): void {
    this.booksFacade.setSearchPage(this.searchOptions.page + 1);
  }

  ngOnInit(): void {
    this.books$.pipe(takeUntil(this.destroy$)).subscribe((books) => {
      if (books) {
        this.favoriteFacade.favoriteBooks$
          .pipe(takeUntil(this.destroy$))
          .subscribe((favBooks) => {
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

    this.searchOptions$
      .pipe(takeUntil(this.destroy$))
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        this.searchOptions = options;
      });

    this.totalItems$.pipe(takeUntil(this.destroy$)).subscribe((totalItems) => {
      if (totalItems - 10 * this.searchOptions.page > 10) {
        this.isShowMore = true;
      } else {
        this.isShowMore = false;
      }
    });
  }
}
