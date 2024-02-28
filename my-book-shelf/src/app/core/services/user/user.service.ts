import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Storage } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUserInfo } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  addUser(user: Omit<IUserInfo, 'id'>): Promise<DocumentReference<IUserInfo>> {
    const userInfo = {
      name: user.name,
      userId: user.userId,
      id: this.afs.createId(),
    };
    const userId = this.auth.currentUser?.uid || null;
    return this.afs
      .collection<IUserInfo>(`/users/${userId}/userInfo`)
      .add(userInfo);
  }

  // getAllUsers(): Observable<DocumentChangeAction<unknown>[]> {
  //   return this.afs.collection('/users').snapshotChanges();
  // }

  getUser(userId: string): Observable<DocumentChangeAction<IUserInfo>[]> {
    return this.afs
      .collection<IUserInfo>(`/users/${userId}/userInfo`)
      .snapshotChanges();
  }

  deleteUser(userId: string): void {
    this.afs.doc('/users/' + userId).delete();
  }

  // updateUser(user: IUser) {
  //   this.deleteUser(user);
  //   this.addUser(user);
  // }
}
