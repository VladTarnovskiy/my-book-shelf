import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IBook } from '@shared/models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecentService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addRecentBook(book: IBook): void {
    const userId = this.auth.currentUser?.uid || null;
    this.afs.collection(`/users/${userId}/recent`).doc(book.id).set(book);
  }

  getRecentBooks(): Observable<DocumentChangeAction<IBook>[]> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IBook>(`/users/${userId}/recent`)
      .snapshotChanges();
  }
}
