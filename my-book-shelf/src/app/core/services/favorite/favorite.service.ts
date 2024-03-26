import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { IBook } from '@shared/models/book';
import { IFavoriteBook } from '@shared/models/favoriteBook';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addFavoriteBook(book: IBook): Observable<void> {
    const favBook = {
      ...book,
      borrowedOn: Date.now().toString(),
      submissionDate: String(Date.now() + 259200000),
    };
    const userId = this.auth.currentUser?.uid || null;
    return from(
      this.afs.collection(`/users/${userId}/favorite`).doc(book.id).set(favBook)
    );
  }

  removeFavoriteBook(bookId: string): Observable<void> {
    const userId = this.auth.currentUser?.uid || null;
    return from(this.afs.doc(`/users/${userId}/favorite/${bookId}`).delete());
  }

  getFavoriteBooks(): Observable<DocumentChangeAction<IFavoriteBook>[]> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IFavoriteBook>(`/users/${userId}/favorite`)
      .snapshotChanges();
  }
}
