import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IReview } from '../../models/review';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [CommonModule, ModalComponent, TranslateModule],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewItemComponent {
  @Input({ required: true }) reviewData!: IReview;
  @Input({ required: true }) userId!: string | null;
  @Output() removeReview = new EventEmitter<string>();
  isRemoveModal = false;

  openModal(): void {
    this.isRemoveModal = true;
  }

  closeModal(value: boolean): void {
    this.isRemoveModal = value;
  }

  removeFromReview(): void {
    this.removeReview.emit(this.reviewData.id);
    this.closeModal(false);
  }
}
