import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { IFirestoreUploadBook } from '../../../my-books/models/upload';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class MyBookService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  async addMyBook(book: IFirestoreUploadBook) {
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

    return this.afs.collection(`/users/${userId}/myBooks`).add({
      ...book,
      file: storageFileUrl,
      image: storageImageUrl,
    });
  }
}
