import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FavoriteBookComponent } from '@components/favorite/favorite-book';
import { FavoriteUploadBookComponent } from '@components/favorite/favorite-upload-book';
import { DestroyDirective } from '@core/directives';
import { FavoriteService } from '@core/services/favorite';
import { MyBooksService } from '@core/services/my-books';
import { TranslateModule } from '@ngx-translate/core';
import { IFavoriteBook } from '@shared/models/favoriteBook';
import { IUploadBook } from '@shared/models/upload';
import { BooksFacade } from '@store/books';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    FavoriteBookComponent,
    AsyncPipe,
    FavoriteUploadBookComponent,
    TranslateModule,
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

  constructor(
    private favoriteService: FavoriteService,
    private myBookService: MyBooksService,
    private booksFacade: BooksFacade
  ) {}

  ngOnInit(): void {
    this.myBookService
      .getMyBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksInfo = books
          .map((item) => item.payload.doc.data())
          .filter((item) => item.isFavorite === true);
        this.uploadFavoriteBooks$.next(booksInfo);
      });

    this.favoriteService
      .getFavoriteBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksInfo = books.map((item) => item.payload.doc.data());
        this.favoriteBooks$.next(booksInfo);
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
    this.myBookService.changeFavoriteStatus(false, bookId);
  }
}
