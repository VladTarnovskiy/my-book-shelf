import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';

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
