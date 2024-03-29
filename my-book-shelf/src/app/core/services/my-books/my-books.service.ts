import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { IFirestoreUploadBook, IUploadBook } from '@shared/models/upload';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyBooksService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  async addMyBook(book: IFirestoreUploadBook): Promise<Observable<void>> {
    const userId = this.auth.currentUser?.uid || null;
    const storageRefFile = ref(
      this.storage,
      `/users/${userId}/myBooks/${book.id}/${book.file?.name}`
    );
    const storageRefImage = ref(
      this.storage,
      `/users/${userId}/myBooks/${book.id}/${book.image?.name}`
    );
    const storageFile = await uploadBytes(storageRefFile, book.file as File);
    const storageImage = await uploadBytes(storageRefImage, book.image as File);
    const storageFileUrl = await getDownloadURL(storageFile.ref);
    const storageImageUrl = await getDownloadURL(storageImage.ref);

    return from(
      this.afs
        .collection<IUploadBook>(`/users/${userId}/myBooks`)
        .doc(book.id)
        .set({
          ...book,
          file: storageFileUrl,
          image: storageImageUrl,
        })
    );
  }

  getMyBooks(): Observable<DocumentChangeAction<IUploadBook>[]> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IUploadBook>(`/users/${userId}/myBooks`)
      .snapshotChanges();
  }

  getMyBook(bookId: string): Observable<Action<DocumentSnapshot<IUploadBook>>> {
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .doc<IUploadBook>(`/users/${userId}/myBooks/${bookId}`)
      .snapshotChanges();
  }

  changeFavoriteStatus(isFavorite: boolean, bookId: string): Observable<void> {
    const userId = this.auth.currentUser?.uid || null;
    return from(
      this.afs
        .doc<IUploadBook>(`/users/${userId}/myBooks/${bookId}`)
        .update({ isFavorite })
    );
  }

  removeMyBook(bookId: string): Observable<void> {
    const userId = this.auth.currentUser?.uid || null;
    return from(this.afs.doc(`/users/${userId}/myBooks/${bookId}`).delete());
  }
}
