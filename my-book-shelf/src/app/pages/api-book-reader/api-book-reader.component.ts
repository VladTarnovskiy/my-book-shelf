import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DestroyDirective } from '@core/directives';
import { GoBackDirective } from '@core/directives';
import { SafePipe } from '@core/pipes';
import { FavoriteService } from '@core/services/favorite';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { BooksFacade } from '@store/books';
import { ReaderBookFacade } from '@store/reader';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-api-book-reader',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgClass,
    SafePipe,
    GoBackDirective,
    TranslateModule,
  ],
  templateUrl: './api-book-reader.component.html',
  styleUrl: './api-book-reader.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiBookReaderComponent implements OnInit, AfterViewInit {
  book$: Observable<IBook | null> = this.readerBookFacade.readerBook$;
  isFavorite$ = new BehaviorSubject<boolean>(false);
  isFullScreen = new BehaviorSubject<boolean>(false);
  isUnavailable$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private destroy$ = inject(DestroyDirective).destroy$;

  @ViewChild('bookCanvas') bookCanvas!: ElementRef;

  constructor(
    private readerBookFacade: ReaderBookFacade,
    private favoriteService: FavoriteService,
    private booksFacade: BooksFacade,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.readerBookFacade.readerBookId$
      .pipe(
        takeUntil(this.destroy$),
        filter((bookId) => bookId !== undefined)
      )
      .subscribe((bookId) => {
        this.readerBookFacade.fetchReaderBook(bookId);
      });

    this.book$.pipe(takeUntil(this.destroy$)).subscribe((book) => {
      if (book) {
        this.favoriteService
          .getFavoriteBooks()
          .pipe(
            takeUntil(this.destroy$),
            map((favBooks) =>
              favBooks.map((favBook) => favBook.payload.doc.data().id)
            ),
            catchError(() => {
              this.toasterService.showFireStoreError();
              this.isLoading$.next(false);
              return of();
            })
          )
          .subscribe((favIDs) => {
            if (favIDs.includes(book.id)) {
              this.isFavorite$.next(true);
            } else {
              this.isFavorite$.next(false);
            }
          });
      }
    });
  }

  toggleFavorite(book: IBook): void {
    if (this.isFavorite$.getValue()) {
      this.favoriteService
        .removeFavoriteBook(book.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => {
            this.toasterService.showFireStoreError();
            return of();
          })
        )
        .subscribe(() => {
          this.booksFacade.removeFavoriteStatus(book.id);
          this.isFavorite$.next(false);
        });
    } else {
      this.favoriteService
        .addFavoriteBook(book)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => {
            this.toasterService.showFireStoreError();
            return of();
          })
        )
        .subscribe(() => {
          this.booksFacade.addFavoriteStatus(book.id);
          this.isFavorite$.next(true);
        });
    }
  }

  toggleFullScreen(ISBN: string | null): void {
    this.isFullScreen.next(!this.isFullScreen.getValue());
    if (document.body.querySelector('#google-script') && ISBN) {
      const viewer = new window.google.books.DefaultViewer(
        this.bookCanvas.nativeElement
      );
      viewer.load(
        `ISBN:${ISBN}`,
        () => {
          this.isUnavailable$.next(true);
          this.isLoading$.next(false);
        },
        () => {
          this.isUnavailable$.next(false);
          this.isLoading$.next(false);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.book$.pipe(takeUntil(this.destroy$)).subscribe((book) => {
      if (book) {
        if (document.body.querySelector('#google-script')) {
          const viewer = new window.google.books.DefaultViewer(
            this.bookCanvas.nativeElement
          );
          viewer.load(
            `ISBN:${book?.ISBN}`,
            () => {
              this.isUnavailable$.next(true);
              this.isLoading$.next(false);
            },
            () => {
              this.isUnavailable$.next(false);
              this.isLoading$.next(false);
            }
          );
        } else {
          const scriptTag = document.createElement('script');
          scriptTag.src = 'https://www.google.com/books/jsapi.js';
          scriptTag.id = 'google-script';
          scriptTag.addEventListener('load', () => {
            window.google.books.load();
            setTimeout(() => {
              const viewer = new window.google.books.DefaultViewer(
                this.bookCanvas.nativeElement
              );
              viewer.load(
                `ISBN:${book?.ISBN}`,
                () => {
                  this.isUnavailable$.next(true);
                  this.isLoading$.next(false);
                },
                () => {
                  this.isUnavailable$.next(false);
                  this.isLoading$.next(false);
                }
              );
            }, 4500);
          });
          document.body.appendChild(scriptTag);
        }
      }
    });
  }
}
