import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { Observable, BehaviorSubject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../models/review';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../core/services/review/review.service';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { ReviewItemComponent } from '../review-item/review-item.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, CommonModule, ReviewItemComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  hostDirectives: [DestroyDirective],
})
export class ReviewComponent implements OnInit {
  username$: Observable<string> = this.authFacade.userName$;
  userId$: Observable<string | null> = this.authFacade.userId$;
  reviews$ = new BehaviorSubject<null | IReview[]>(null);
  username = 'Unknown';
  reviewText = '';
  private destroy$ = inject(DestroyDirective).destroy$;

  @Input({ required: true }) bookId!: string;

  constructor(
    private authFacade: AuthFacade,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.username$.subscribe((name) => {
      this.username = name;
    });

    this.reviewService
      .getReviews(this.bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((reviews) => {
        const reviewsInfo = reviews.map((item) => item.payload.doc.data());
        this.reviews$.next(reviewsInfo);
      });
  }

  sendReview(): void {
    const review = {
      username: this.username,
      review: this.reviewText,
      bookId: this.bookId,
    };
    this.reviewText = '';
    this.reviewService.addReview(review);
  }

  removeReview(reviewId: string) {
    this.reviewService.removeReview(this.bookId, reviewId);
  }
}
