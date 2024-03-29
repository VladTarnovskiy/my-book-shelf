import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MyBookComponent } from '@components/my-books/my-book';
import { BookSkeletonComponent } from '@components/shared/book-skeleton';
import { DestroyDirective } from '@core/directives';
import { MyBooksService } from '@core/services/my-books';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IUploadBook } from '@shared/models/upload';
import { BehaviorSubject, catchError, map, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [AsyncPipe, MyBookComponent, TranslateModule, BookSkeletonComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class MyBooksComponent implements OnInit {
  myBooks$ = new BehaviorSubject<null | IUploadBook[]>(null);
  private destroy$ = inject(DestroyDirective).destroy$;
  skeletonItems = [...Array(10).keys()];
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private myBookService: MyBooksService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.myBookService
      .getMyBooks()
      .pipe(
        takeUntil(this.destroy$),
        map((books) => books.map((item) => item.payload.doc.data())),
        catchError(() => {
          this.toasterService.showFireStoreError();
          this.isLoading$.next(false);
          return of();
        })
      )
      .subscribe((booksData) => {
        this.myBooks$.next(booksData);
        this.isLoading$.next(false);
      });
  }

  removeFromMyBook(bookId: string): void {
    this.myBookService
      .removeMyBook(bookId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.toasterService.showFireStoreError();
          return of();
        })
      )
      .subscribe(() => {
        this.toasterService.show({
          type: 'success',
          title: this.translateService.instant('TOASTER.REMOVE.TITLE'),
          message: this.translateService.instant('TOASTER.REMOVE.MESSAGE'),
        });
      });
  }
}
