import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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

@Component({
  selector: 'app-api-book-reader',
  standalone: true,
  imports: [CommonModule, SafePipe, GoBackDirective],
  templateUrl: './api-book-reader.component.html',
  styleUrl: './api-book-reader.component.scss',
  hostDirectives: [DestroyDirective],
})
export class ApiBookReaderComponent implements OnInit, AfterViewInit {
  book$: Observable<IBook | null> = this.booksFacade.bookByISBNId$;
  book: IBook | null = null;
  isFavorite = false;
  isAvailable: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private destroy$ = inject(DestroyDirective).destroy$;

  @ViewChild('bookCanvas') bookCanvas!: ElementRef;

  constructor(
    private booksFacade: BooksFacade,
    private favoriteFacade: FavoriteFacade
  ) {}

  ngOnInit(): void {
    this.book$.pipe(takeUntil(this.destroy$)).subscribe((book) => {
      if (book) {
        this.book = book;
        this.isFavorite = book.isFavorite;
      }
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

  ngAfterViewInit(): void {
    if (this.book) {
      if (document.body.querySelector('#google-script')) {
        const viewer = new window.google.books.DefaultViewer(
          this.bookCanvas.nativeElement
        );
        viewer.load('ISBN:' + this.book?.ISBN, () => {
          this.isAvailable.next(false);
        });
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
            viewer.load('ISBN:' + this.book?.ISBN, () => {
              this.isAvailable.next(false);
              console.log(false);
            });
          }, 1000);
        });
        document.body.appendChild(scriptTag);
      }
    }
  }
}
