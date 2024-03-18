import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IReviewLikesParam } from '@shared/interfaces/review';
import { IReview } from '@shared/models/review';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addReview(
    review: Omit<IReview, 'id' | 'userId' | 'creationDate'>
  ): Observable<void> {
    const userId = this.auth.currentUser?.uid || null;
    const reviewId = this.afs.createId();
    const reviewInfo = {
      ...review,
      userId,
      id: reviewId,
      creationDate: String(Date.now()),
    };
    return from(
      this.afs
        .collection<IReview>(`/reviews/${review.bookId}/reviews`)
        .doc(reviewId)
        .set(reviewInfo)
    );
  }

  toggleLike({ reviewId, bookId, likes }: IReviewLikesParam): Observable<void> {
    return from(
      this.afs
        .collection<IReview>(`/reviews/${bookId}/reviews`)
        .doc(reviewId)
        .update({ likes: likes })
    );
  }

  getReviews(bookId: string): Observable<DocumentChangeAction<IReview>[]> {
    return this.afs
      .collection<IReview>(`/reviews/${bookId}/reviews`)
      .snapshotChanges();
  }

  removeReview(bookId: string, reviewId: string): Observable<void> {
    return from(
      this.afs.doc(`/reviews/${bookId}/reviews/${reviewId}`).delete()
    );
  }
}
