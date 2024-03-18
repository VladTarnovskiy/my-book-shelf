import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '@components/shared/loader';
import { DestroyDirective } from '@core/directives';
import { ReviewService } from '@core/services/review';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    LoaderComponent,
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
  isLoading$ = new BehaviorSubject<boolean>(false);

  @Input({ required: true }) bookId!: string;

  constructor(
    private authFacade: AuthFacade,
    private reviewService: ReviewService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.reviewService
      .getReviews(this.bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reviews) => {
          const reviewsInfo = reviews
            .map((item) => item.payload.doc.data())
            .sort((a, b) => Number(a.creationDate) - Number(b.creationDate));
          this.reviews$.next(reviewsInfo);
          this.isLoading$.next(false);
        },
        error: () => {
          this.toasterService.showFireStoreError();
          this.isLoading$.next(false);
        },
      });
  }

  sendReview(): void {
    if (this.reviewText.valid) {
      const review = {
        review: this.reviewText.value,
        bookId: this.bookId,
        likes: [],
      };
      this.reviewText.setValue('');
      this.reviewService
        .addReview(review)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toasterService.show({
              type: 'success',
              title: this.translateService.instant('UPLOAD.ADD_REVIEW.TITLE'),
              message: this.translateService.instant(
                'UPLOAD.ADD_REVIEW.MESSAGE'
              ),
            });
          },
          error: () => {
            this.toasterService.showFireStoreError();
          },
        });
    }
  }

  removeReview(reviewId: string): void {
    this.reviewService
      .removeReview(this.bookId, reviewId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toasterService.show({
            type: 'success',
            title: this.translateService.instant('UPLOAD.REMOVE_REVIEW.TITLE'),
            message: this.translateService.instant(
              'UPLOAD.REMOVE_REVIEW.MESSAGE'
            ),
          });
        },
        error: () => {
          this.toasterService.showFireStoreError();
        },
      });
  }
}
