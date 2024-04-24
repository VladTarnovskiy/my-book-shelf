import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IBook, IRecentBook } from '@shared/models/book';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecentService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addRecentBook(book: IBook): Observable<void> {
    const userId = this.auth.currentUser?.uid || null;
    const recentBook: IRecentBook = { ...book, creationDate: Date.now() };
    return from(
      this.afs
        .collection(`/users/${userId}/recent`)
        .doc(book.id)
        .set(recentBook)
    );
  }

  getRecentBooks(): Observable<DocumentChangeAction<IRecentBook>[]> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IRecentBook>(`/users/${userId}/recent`, (ref) =>
        ref.where('creationDate', '>=', Date.now() - 24 * 60 * 60 * 1000 * 5)
      )
      .snapshotChanges();
  }
}
