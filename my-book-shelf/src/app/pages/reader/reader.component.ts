import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DestroyDirective } from '@core/directives';
import { GoBackDirective } from '@core/directives';
import { SafePipe } from '@core/pipes';
import { MyBooksService } from '@core/services/my-books';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { IUploadBook } from '@shared/models/upload';
import { BooksFacade } from '@store/books';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [SafePipe, GoBackDirective, TranslateModule, AsyncPipe, NgClass],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderComponent implements OnInit {
  book$ = new BehaviorSubject<IUploadBook | null>(null);
  book: IUploadBook | null = null;
  isFullScreen = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private myBookService: MyBooksService,
    private booksFacade: BooksFacade,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.booksFacade.myBookId$
      .pipe(
        takeUntil(this.destroy$),
        filter((myBookId) => myBookId !== undefined),
        switchMap((myBookId) => this.myBookService.getMyBook(myBookId)),
        map((book) => book.payload.data()),
        catchError(() => {
          this.toasterService.showFireStoreError();
          this.isLoading$.next(false);
          return of();
        })
      )
      .subscribe((bookData) => {
        this.isLoading$.next(false);
        if (bookData) {
          this.book = bookData;
          this.book$.next(bookData);
        }
      });
  }

  toggleFavorite(): void {
    if (this.book) {
      this.myBookService
        .changeFavoriteStatus(!this.book.isFavorite, this.book.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => {
            this.toasterService.showFireStoreError();
            return of();
          })
        )
        .subscribe();
    }
  }

  toggleFullScreen(): void {
    this.isFullScreen.next(!this.isFullScreen.getValue());
  }
}
