import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IReview } from '@shared/models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addReview(review: Omit<IReview, 'id' | 'userId' | 'creationDate'>): void {
    const userId = this.auth.currentUser?.uid || null;
    const reviewId = this.afs.createId();
    const reviewInfo = {
      ...review,
      userId,
      id: reviewId,
      creationDate: Date.now(),
    };
    this.afs
      .collection(`/reviews/${review.bookId}/reviews`)
      .doc(reviewId)
      .set(reviewInfo);
  }

  getReviews(bookId: string): Observable<DocumentChangeAction<IReview>[]> {
    return this.afs
      .collection<IReview>(`/reviews/${bookId}/reviews`)
      .snapshotChanges();
  }

  removeReview(bookId: string, reviewId: string): void {
    this.afs.doc(`/reviews/${bookId}/reviews/${reviewId}`).delete();
  }
}
