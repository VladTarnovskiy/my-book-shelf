import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MyBookComponent } from '@components/my-books/my-book';
import { DestroyDirective } from '@core/directives/destroy';
import { MyBooksService } from '@core/services/my-books';
import { TranslateModule } from '@ngx-translate/core';
import { IUploadBook } from '@shared/models/upload';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [AsyncPipe, MyBookComponent, TranslateModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class MyBooksComponent implements OnInit {
  myBooks$ = new BehaviorSubject<null | IUploadBook[]>(null);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private myBookService: MyBooksService) {}

  ngOnInit(): void {
    this.myBookService
      .getMyBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksInfo = books.map((item) => item.payload.doc.data());
        this.myBooks$.next(booksInfo);
      });
  }

  removeFromMyBook(bookId: string): void {
    this.myBookService.removeMyBook(bookId);
  }
}
