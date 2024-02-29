import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { IUploadBook } from '../../models/upload';
import { CommonModule } from '@angular/common';
import { MyBookComponent } from '../../components/my-book/my-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { MyBookService } from '../../../core/services/my-book/my-book.service';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, MyBookComponent, TranslateModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class MyBooksComponent implements OnInit {
  myBooks$ = new BehaviorSubject<null | IUploadBook[]>(null);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private myBookService: MyBookService) {}

  ngOnInit(): void {
    this.myBookService
      .getMyBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksInfo = books.map((item) => item.payload.doc.data());
        console.log(booksInfo);
        this.myBooks$.next(booksInfo);
      });
  }

  removeFromMyBook(bookId: string): void {
    this.myBookService.removeMyBook(bookId);
  }
}
