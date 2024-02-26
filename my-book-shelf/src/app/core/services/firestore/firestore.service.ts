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
export class FirestoreService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  addUser(name: string) {
    const userInfo = {
      name: name,
      id: this.afs.createId(),
    };
    const userId = this.auth.currentUser?.uid || null;
    return this.afs.collection(`/users/${userId}/userInfo`).add(userInfo);
  }

  getAllUsers() {
    return this.afs.collection('/users').snapshotChanges();
  }

  getUser(userId: string) {
    return this.afs.collection(`/users/${userId}/userInfo`).snapshotChanges();
  }

  deleteUser(userId: string) {
    this.afs.doc('/users/' + userId).delete();
  }

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

  // updateUser(user: IUser) {
  //   this.deleteUser(user);
  //   this.addUser(user);
  // }
}
