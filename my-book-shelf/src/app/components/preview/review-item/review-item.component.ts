import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ModalComponent } from '@components/shared/modal';
import { DestroyDirective } from '@core/directives/destroy';
import { UserService } from '@core/services/user';
import { TranslateModule } from '@ngx-translate/core';
import { IReview } from '@shared/models/review';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [AsyncPipe, ModalComponent, TranslateModule],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class ReviewItemComponent implements OnInit {
  @Input({ required: true }) reviewData!: IReview;
  @Input({ required: true }) userId!: string | null;
  @Output() removeReview = new EventEmitter<string>();
  username$ = new BehaviorSubject<string>('Unknown');
  userPhoto$ = new BehaviorSubject<string | null>(null);
  isRemoveModal = false;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private userService: UserService) {}

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

  ngOnInit(): void {
    this.userService
      .getUser(String(this.reviewData.userId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        const userData = user.payload.data();
        if (userData) {
          this.username$.next(userData.name);
          this.userPhoto$.next(userData.photo);
        }
      });
  }
}
