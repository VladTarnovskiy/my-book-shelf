import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUploadBook } from '../../models/upload';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-my-book',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
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
