import { Component, Input, OnInit } from '@angular/core';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../models/review';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../core/services/review/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  username$: Observable<string> = this.authFacade.userName$;
  userId$: Observable<string | null> = this.authFacade.userId$;
  reviews$ = new BehaviorSubject<null | IReview[]>(null);
  username = 'Unknown';
  reviewText = '';
  @Input({ required: true }) bookId!: string;

  constructor(
    private authFacade: AuthFacade,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.username$.subscribe((name) => {
      this.username = name;
    });

    this.reviewService.getReviews(this.bookId).subscribe((reviews) => {
      const reviewsInfo = reviews.map((item) => item.payload.doc.data());
      this.reviews$.next(reviewsInfo);
    });
  }

  sendReview() {
    const review = {
      username: this.username,
      review: this.reviewText,
      bookId: this.bookId,
    };
    this.reviewService.addReview(review);
  }
}
