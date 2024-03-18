import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FavoriteBookComponent } from '@components/favorite/favorite-book';
import { FavoriteUploadBookComponent } from '@components/favorite/favorite-upload-book';
import { BookSkeletonComponent } from '@components/shared/book-skeleton';
import { DestroyDirective } from '@core/directives';
import { FavoriteService } from '@core/services/favorite';
import { MyBooksService } from '@core/services/my-books';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { IFavoriteBook } from '@shared/models/favoriteBook';
import { IUploadBook } from '@shared/models/upload';
import { BooksFacade } from '@store/books';
import { BehaviorSubject, combineLatest, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    FavoriteBookComponent,
    AsyncPipe,
    FavoriteUploadBookComponent,
    TranslateModule,
    BookSkeletonComponent,
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class FavoriteComponent implements OnInit {
  favoriteBooks$ = new BehaviorSubject<IFavoriteBook[] | null>(null);
  uploadFavoriteBooks$ = new BehaviorSubject<IUploadBook[] | null>(null);
  private destroy$ = inject(DestroyDirective).destroy$;
  skeletonItems = [...Array(10).keys()];
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private favoriteService: FavoriteService,
    private myBookService: MyBooksService,
    private booksFacade: BooksFacade,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    const myFavBooks = this.myBookService
      .getMyBooks()
      .pipe(
        map((books) =>
          books
            .map((item) => item.payload.doc.data())
            .filter((item) => item.isFavorite === true)
        )
      );

    const favBooks = this.favoriteService
      .getFavoriteBooks()
      .pipe(map((books) => books.map((item) => item.payload.doc.data())));

    combineLatest([myFavBooks, favBooks])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([myFavBooksData, favBooksData]) => {
          this.uploadFavoriteBooks$.next(myFavBooksData);
          this.favoriteBooks$.next(favBooksData);
          this.isLoading$.next(false);
        },
        error: () => {
          this.toasterService.showFireStoreError();
          this.isLoading$.next(false);
        },
      });
  }

  removeFromFavorite(bookId: string): void {
    this.favoriteService.removeFavoriteBook(bookId);
    this.removeFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string): void {
    this.booksFacade.removeFavoriteStatus(bookId);
  }

  removeFromUploadFavorite(bookId: string): void {
    this.myBookService
      .changeFavoriteStatus(false, bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: () => {
          this.toasterService.showFireStoreError();
        },
      });
  }
}
