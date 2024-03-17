import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestroyDirective } from '@core/directives';
import { ReviewService } from '@core/services/review';
import { TranslateModule } from '@ngx-translate/core';
import { IReview } from '@shared/models/review';
import { AuthFacade } from '@store/auth';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';

import { ReviewItemComponent } from '../review-item';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    AsyncPipe,
    ReviewItemComponent,
    TranslateModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  userPhoto$: Observable<string | null> = this.authFacade.userPhoto$;
  reviews$ = new BehaviorSubject<null | IReview[]>(null);
  userId$: Observable<string | null> = this.authFacade.userId$;
  reviewText = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  private destroy$ = inject(DestroyDirective).destroy$;

  @Input({ required: true }) bookId!: string;

  constructor(
    private authFacade: AuthFacade,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
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
    if (this.reviewText.valid) {
      const review = {
        review: this.reviewText.value,
        bookId: this.bookId,
      };
      this.reviewText.setValue('');
      this.reviewService.addReview(review);
    }
  }

  removeReview(reviewId: string): void {
    this.reviewService.removeReview(this.bookId, reviewId);
  }
}
