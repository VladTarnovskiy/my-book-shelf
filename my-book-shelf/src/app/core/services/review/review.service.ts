import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
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

  addReview(
    review: Omit<IReview, 'id' | 'userId'>
  ): Promise<DocumentReference<unknown>> {
    const userId = this.auth.currentUser?.uid || null;
    console.log(userId);
    const reviewInfo = {
      ...review,
      userId,
      id: this.afs.createId(),
    };
    return this.afs
      .collection(`/reviews/${review.bookId}/reviews`)
      .add(reviewInfo);
  }

  getReviews(bookId: string): Observable<DocumentChangeAction<IReview>[]> {
    return this.afs
      .collection<IReview>(`/reviews/${bookId}/reviews`)
      .snapshotChanges();
  }
}
