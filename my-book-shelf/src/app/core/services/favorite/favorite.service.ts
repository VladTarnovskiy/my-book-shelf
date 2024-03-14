import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { IFavoriteBook } from '../../../shared/models/favoriteBook';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {}

  addFavoriteBook(book: IBook): void {
    const favBook = {
      ...book,
      borrowedOn: Date.now().toString(),
      submissionDate: String(Date.now() + 259200000),
    };
    const userId = this.auth.currentUser?.uid || null;
    this.afs.collection(`/users/${userId}/favorite`).doc(book.id).set(favBook);
  }

  removeFavoriteBook(bookId: string): void {
    const userId = this.auth.currentUser?.uid || null;
    this.afs.doc(`/users/${userId}/favorite/${bookId}`).delete();
  }

  getFavoriteBooks(): Observable<DocumentChangeAction<IFavoriteBook>[]> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IFavoriteBook>(`/users/${userId}/favorite`)
      .snapshotChanges();
  }
}
