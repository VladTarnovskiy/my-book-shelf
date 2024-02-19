import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUploadBook } from '../../models/upload';

@Component({
  selector: 'app-my-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-book.component.html',
  styleUrl: './my-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookComponent {
  @Input({ required: true }) bookData!: IUploadBook;
  @Output() removeFromMyBookEvent = new EventEmitter<string>();
  @Output() readBook = new EventEmitter<string>();

  removeFromMyBook(): void {
    this.removeFromMyBookEvent.emit(this.bookData.id);
  }

  readMyBook(): void {
    this.readBook.emit(this.bookData.id);
  }
}
