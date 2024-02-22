import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { FavoriteFacade } from '../../../store/favorite/favorite.facade';
import { ReaderBookFacade } from '../../../store/api-reader/api-reader.facade';

@Component({
  selector: 'app-api-book-reader',
  standalone: true,
  imports: [CommonModule, SafePipe, GoBackDirective],
  templateUrl: './api-book-reader.component.html',
  styleUrl: './api-book-reader.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiBookReaderComponent implements OnInit, AfterViewChecked {
  book$: Observable<IBook | null> = this.readerBookFacade.readerBook$;
  book: IBook | null = null;
  isFavorite = false;
  isUnavailable$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private destroy$ = inject(DestroyDirective).destroy$;

  @ViewChild('bookCanvas') bookCanvas!: ElementRef;

  constructor(
    private readerBookFacade: ReaderBookFacade,
    private favoriteFacade: FavoriteFacade,
    private booksFacade: BooksFacade,
    private cd: ChangeDetectorRef
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
      this.book = book;
    });
  }

  addToFavorite(book: IBook): void {
    this.favoriteFacade.addFavoriteBook(book);
    this.addFavoriteStatus();
  }

  removeFromFavorite(bookId: string): void {
    this.favoriteFacade.removeFavoriteBook(bookId);
    this.removeFavoriteStatus();
  }

  removeFavoriteStatus(): void {
    if (this.book) {
      this.booksFacade.removeFavoriteStatus(this.book.id);
      this.isFavorite = false;
    }
  }

  addFavoriteStatus(): void {
    if (this.book) {
      this.booksFacade.addFavoriteStatus(this.book.id);
      this.isFavorite = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.book) {
      if (document.body.querySelector('#google-script')) {
        const viewer = new window.google.books.DefaultViewer(
          this.bookCanvas.nativeElement
        );
        viewer.load(
          `ISBN:${this.book?.ISBN}`,
          () => {
            this.isUnavailable$.next(true);
            this.isLoading$.next(false);
            this.cd.detectChanges();
          },
          () => {
            this.isUnavailable$.next(false);
            this.isLoading$.next(false);
            this.cd.detectChanges();
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
              `ISBN:${this.book?.ISBN}`,
              () => {
                this.isUnavailable$.next(true);
                this.isLoading$.next(false);
                this.cd.detectChanges();
              },
              () => {
                this.isUnavailable$.next(false);
                this.isLoading$.next(false);
                this.cd.detectChanges();
              }
            );
          }, 2000);
        });
        document.body.appendChild(scriptTag);
      }
    }
  }
}
