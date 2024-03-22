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
import { IUserData } from '@shared/models/user';
import { SvgIconComponent } from 'angular-svg-icon';
import { BehaviorSubject, catchError, map, of, takeUntil } from 'rxjs';

import { LikesInfoComponent } from '../likes-info/likes-info.component';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [
    AsyncPipe,
    ModalComponent,
    TranslateModule,
    SvgIconComponent,
    LikesInfoComponent,
  ],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class ReviewItemComponent implements OnInit {
  @Input({ required: true }) reviewData!: IReview;
  @Input({ required: true }) currentUserData!: IUserData;
  @Output() removeReview = new EventEmitter<string>();
  reviewUsername$ = new BehaviorSubject<string>('Unknown');
  reviewUserPhoto$ = new BehaviorSubject<string | null>(null);
  isMyLike$ = new BehaviorSubject<boolean>(false);
  likeAnimation$ = new BehaviorSubject<boolean>(false);
  likesInfo$ = new BehaviorSubject<boolean>(false);
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
          this.reviewUsername$.next(userData.name);
          this.reviewUserPhoto$.next(userData.photo);
        }
      });
    const likes = this.reviewData.likes.map((like) => like.userId);
    if (
      this.currentUserData.userId &&
      likes.includes(this.currentUserData.userId)
    ) {
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

  toggleLikesInfo(): void {
    this.likesInfo$.next(!this.likesInfo$.getValue());
  }

  toggleLike(): void {
    if (this.currentUserData.userId) {
      const likes = this.reviewData.likes.map((like) => like.userId);
      if (likes.includes(this.currentUserData.userId)) {
        const likes = this.reviewData.likes.filter(
          (like) => like.userId !== this.currentUserData.userId
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
        const newLike = {
          userPhoto: this.currentUserData.userPhoto || 'assets/google.svg',
          username: this.currentUserData.username || 'Unknown',
          userId: this.currentUserData.userId,
        };
        this.reviewService
          .toggleLike({
            bookId: this.reviewData.bookId,
            reviewId: this.reviewData.id,
            likes: [...this.reviewData.likes, newLike],
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
