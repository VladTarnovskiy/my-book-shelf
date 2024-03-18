import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CategoryFilterComponent } from '@components/search/category-filter';
import { SearchBookComponent } from '@components/search/search-book';
import { SearchBookSkeletonComponent } from '@components/search/search-book-skeleton';
import { DestroyDirective } from '@core/directives';
import { FavoriteService } from '@core/services/favorite';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { ISearchOptions } from '@shared/interfaces/search';
import { IBook } from '@shared/models/book';
import { BooksFacade } from '@store/books';
import { BehaviorSubject, combineLatest, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CategoryFilterComponent,
    SearchBookComponent,
    AsyncPipe,
    SearchBookSkeletonComponent,
    TranslateModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class SearchComponent implements OnInit {
  isLoading$: Observable<boolean> = this.booksFacade.booksLoading$;
  searchOptions!: ISearchOptions;
  books$ = new BehaviorSubject<IBook[]>([]);
  skeletonItems = [...Array(10).keys()];
  isShowMore = false;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private booksFacade: BooksFacade,
    private favoriteService: FavoriteService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.booksFacade.books$,
      this.favoriteService.getFavoriteBooks(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([books, favBooks]) => {
          if (books) {
            const favIDs = favBooks.map(
              (favBook) => favBook.payload.doc.data().id
            );
            const checkedBooks = books?.map((book) => {
              if (favIDs.includes(book.id)) {
                return { ...book, isFavorite: true };
              } else {
                return book;
              }
            });
            this.books$.next(checkedBooks);
          }
        },
        error: () => {
          this.toasterService.showFireStoreError();
        },
      });

    this.booksFacade.searchOptions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        this.searchOptions = options;
      });

    this.booksFacade.searchTotalBooks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((totalItems) => {
        if (totalItems - 10 * this.searchOptions.page > 10) {
          this.isShowMore = true;
        } else {
          this.isShowMore = false;
        }
      });
  }

  addToFavorite(book: IBook): void {
    this.favoriteService.addFavoriteBook(book);
    this.addFavoriteStatus(book.id);
  }

  removeFromFavorite(bookId: string): void {
    this.favoriteService.removeFavoriteBook(bookId);
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
    this.booksFacade.fetchBooks({
      searchValue: this.searchOptions.searchValue,
      filterType: this.searchOptions.filterType,
      categoryFilterType: this.searchOptions.categoryFilterType,
      page: this.searchOptions.page,
    });
  }

  setNextPage(): void {
    this.booksFacade.setSearchPage(this.searchOptions.page + 1);
  }
}
