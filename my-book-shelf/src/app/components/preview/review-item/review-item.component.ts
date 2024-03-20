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
import { DestroyDirective } from '@core/directives';
import { ReviewService } from '@core/services/review';
import { ToasterService } from '@core/services/toaster';
import { UserService } from '@core/services/user';
import { TranslateModule } from '@ngx-translate/core';
import { IReview } from '@shared/models/review';
import { BehaviorSubject, catchError, map, of, takeUntil } from 'rxjs';

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
  isMyLike$ = new BehaviorSubject<boolean>(false);
  likeAnimation$ = new BehaviorSubject<boolean>(false);
  isRemoveModal = false;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser(String(this.reviewData.userId))
      .pipe(
        takeUntil(this.destroy$),
        map((user) => user.payload.data()),
        catchError(() => {
          this.toasterService.showFireStoreError();
          return of();
        })
      )
      .subscribe((userData) => {
        if (userData) {
          this.username$.next(userData.name);
          this.userPhoto$.next(userData.photo);
        }
      });
    if (this.userId && this.reviewData.likes.includes(this.userId)) {
      this.isMyLike$.next(true);
    }
  }

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

  toggleLike(): void {
    if (this.userId) {
      if (this.reviewData.likes.includes(this.userId)) {
        const likes = this.reviewData.likes.filter(
          (like) => like !== this.userId
        );
        this.reviewService
          .toggleLike({
            bookId: this.reviewData.bookId,
            reviewId: this.reviewData.id,
            likes,
          })
          .pipe(
            takeUntil(this.destroy$),
            catchError(() => {
              this.toasterService.showFireStoreError();
              return of();
            })
          )
          .subscribe();
      } else {
        this.reviewService
          .toggleLike({
            bookId: this.reviewData.bookId,
            reviewId: this.reviewData.id,
            likes: [...this.reviewData.likes, this.userId],
          })
          .pipe(
            takeUntil(this.destroy$),
            catchError(() => {
              this.toasterService.showFireStoreError();
              return of();
            })
          )
          .subscribe();
      }
      this.isMyLike$.next(!this.isMyLike$.getValue());
      this.likeAnimation$.next(true);
      setTimeout(() => {
        this.likeAnimation$.next(false);
      }, 1000);
    }
  }
}
