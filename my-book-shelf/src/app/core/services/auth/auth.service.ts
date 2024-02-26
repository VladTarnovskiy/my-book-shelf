import { Injectable } from '@angular/core';
import {
  Auth,
  // RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signInWithPhoneNumber,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../toaster/toaster.service';
import { FirestoreService } from '../firestore/firestore.service';
import { IUserDetails } from '../../../auth/models/user';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { IUserInfo } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //only for a develop term the isLogin field is true
  private isLoggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private authFacade: AuthFacade,
    private fireStore: FirestoreService,
    private toaster: ToasterService
  ) {}

  async signUp({ email, password, name }: IUserDetails): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.fireStore.addUser(name);
      this.router.navigate(['auth/login']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  async login({ email, password }: Omit<IUserDetails, 'name'>): Promise<void> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.fireStore.getUser(user.user.uid).subscribe((x) => {
        const userInfo = x.map((item) =>
          item.payload.doc.data()
        ) as IUserInfo[];
        if (userInfo[0]) {
          this.authFacade.addUserName(userInfo[0].name);
        }
      });
      this.isLoggedIn.next(true);
      this.router.navigate(['/']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  errorHandling(error: Error) {
    this.toaster.show({
      type: 'error',
      title: error.name,
      body: error.message,
    });
  }
}
