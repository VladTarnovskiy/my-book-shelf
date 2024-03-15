import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '@components/shared/modal';
import { TranslateModule } from '@ngx-translate/core';
import { IUploadBook } from '@shared/models/upload';

@Component({
  selector: 'app-my-book',
  standalone: true,
  imports: [DatePipe, RouterLink, ModalComponent, TranslateModule],
  templateUrl: './my-book.component.html',
  styleUrl: './my-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookComponent {
  @Input({ required: true }) bookData!: IUploadBook;
  @Output() removeFromMyBookEvent = new EventEmitter<string>();
  isRemoveModal = false;

  openModal(): void {
    this.isRemoveModal = true;
  }

  closeModal(value: boolean): void {
    this.isRemoveModal = value;
  }

  removeFromMyBook(): void {
    this.removeFromMyBookEvent.emit(this.bookData.id);
    this.closeModal(false);
  }
}
