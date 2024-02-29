import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IReview } from '../../../search/models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addReview(review: Omit<IReview, 'id' | 'userId'>): void {
    const userId = this.auth.currentUser?.uid || null;
    console.log(userId);
    const reviewId = this.afs.createId();
    const reviewInfo = {
      ...review,
      userId,
      id: reviewId,
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
