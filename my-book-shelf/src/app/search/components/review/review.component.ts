import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { Observable, BehaviorSubject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../models/review';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../core/services/review/review.service';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, CommonModule, ReviewItemComponent, TranslateModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  hostDirectives: [DestroyDirective],
})
export class ReviewComponent implements OnInit {
  userPhoto$: Observable<string | null> = this.authFacade.userPhoto$;
  reviews$ = new BehaviorSubject<null | IReview[]>(null);
  userId$: Observable<string | null> = this.authFacade.userId$;
  username = 'Unknown';
  userPhoto: string | null = 'Unknown';
  reviewText = '';
  private destroy$ = inject(DestroyDirective).destroy$;

  @Input({ required: true }) bookId!: string;

  constructor(
    private authFacade: AuthFacade,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.authFacade.userName$
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.username = name;
      });

    this.authFacade.userPhoto$
      .pipe(takeUntil(this.destroy$))
      .subscribe((photo) => {
        this.userPhoto = photo;
      });

    this.reviewService
      .getReviews(this.bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((reviews) => {
        const reviewsInfo = reviews
          .map((item) => item.payload.doc.data())
          .sort((a, b) => Number(a.creationDate) - Number(b.creationDate));
        this.reviews$.next(reviewsInfo);
      });
  }

  sendReview(): void {
    if (this.reviewText !== '') {
      const review = {
        review: this.reviewText,
        bookId: this.bookId,
      };
      this.reviewText = '';
      this.reviewService.addReview(review);
    }
  }

  removeReview(reviewId: string): void {
    this.reviewService.removeReview(this.bookId, reviewId);
  }
}
