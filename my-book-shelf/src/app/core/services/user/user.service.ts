import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUserInfo } from '../../models/user';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  Storage,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  addUser(user: Omit<IUserInfo, 'id' | 'photo'>): void {
    const userInfo = {
      name: user.name,
      userId: user.userId,
      id: this.afs.createId(),
      photo: null,
    };
    const userId = this.auth.currentUser?.uid || null;
    if (userId) {
      this.afs
        .collection<IUserInfo>(`/users/${userId}/userInfo`)
        .doc(userId)
        .set(userInfo);
    }
  }

  getUser(userId: string): Observable<Action<DocumentSnapshot<IUserInfo>>> {
    return this.afs
      .doc<IUserInfo>(`/users/${userId}/userInfo/${userId}`)
      .snapshotChanges();
  }

  changeUsername(name: string): void {
    const userId = this.auth.currentUser?.uid || null;
    if (userId) {
      this.afs
        .doc<IUserInfo>(`/users/${userId}/userInfo/${userId}`)
        .update({ name });
    }
  }

  async changeUserPhoto(photo: File): Promise<void> {
    const userId = this.auth.currentUser?.uid || null;
    const storageRefPhoto = ref(
      this.storage,
      `/users/${userId}/photo/${photo.name}`
    );
    const storagePhoto = await uploadBytes(storageRefPhoto, photo as File);
    const storagePhotoUrl = await getDownloadURL(storagePhoto.ref);

    this.afs
      .doc<IUserInfo>(`/users/${userId}/userInfo/${userId}`)
      .update({ photo: storagePhotoUrl });
  }

  deleteUser(userId: string): void {
    this.afs.doc(`/users/${userId}`).delete();
  }
}
