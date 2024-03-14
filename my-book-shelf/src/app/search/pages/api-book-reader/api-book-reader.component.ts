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
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { GoBackDirective } from '../../../core/directives/go-back/go-back.directive';
import { SafePipe } from '../../../core/pipes/safe/safe.pipe';
import { BooksFacade } from '../../../store/books/books.facade';
import { IBook } from '../../../shared/models/book.model';
import { ReaderBookFacade } from '../../../store/api-reader/api-reader.facade';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';

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
    private booksFacade: BooksFacade
  ) {}

  ngOnInit(): void {
    this.readerBookFacade.readerBookId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookId) => {
        if (bookId) {
          this.readerBookFacade.fetchReaderBook(bookId);
        }
      });

    this.book$.pipe(takeUntil(this.destroy$)).subscribe((book) => {
      if (book) {
        this.favoriteService
          .getFavoriteBooks()
          .pipe(takeUntil(this.destroy$))
          .subscribe((favBooks) => {
            const favIDs = favBooks.map(
              (favBook) => favBook.payload.doc.data().id
            );
            if (favIDs.includes(book.id)) {
              this.isFavorite$.next(true);
            } else {
              this.isFavorite$.next(false);
            }
          });
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

  removeFavoriteStatus(bookId: string): void {
    this.booksFacade.removeFavoriteStatus(bookId);
    this.isFavorite$.next(false);
  }

  addFavoriteStatus(bookId: string): void {
    this.booksFacade.addFavoriteStatus(bookId);
    this.isFavorite$.next(true);
  }

  toggleFullScreen(): void {
    this.isFullScreen.next(!this.isFullScreen.getValue());
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
            }, 4000);
          });
          document.body.appendChild(scriptTag);
        }
      }
    });
  }
}
