import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MyBooksFacade } from '../../../store/my-books/my-books.facade';
import { IUploadBook } from '../../models/upload';
import { CommonModule } from '@angular/common';
import { MyBookComponent } from '../../components/my-book/my-book.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, MyBookComponent, TranslateModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBooksComponent {
  myBooks$: Observable<IUploadBook[]> = this.myBooksFacade.myBooks$;

  constructor(private myBooksFacade: MyBooksFacade) {}

  removeFromMyBook(bookId: string): void {
    this.myBooksFacade.removeMyBook(bookId);
  }
}
