import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendEmailVerification,
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
    private toasterService: ToasterService
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
      this.setUserName(user.user.uid);
      await sendEmailVerification(user.user);
      this.router.navigate(['auth/verification']);

      const interval = setInterval(async () => {
        if (user.user.emailVerified) {
          clearInterval(interval);
          this.isLoggedIn.next(true);
          this.router.navigate(['/']);
        }
        await user.user.reload();
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  async logInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      this.fireStore.addUser(user.displayName || 'Unknown');
      this.setUserName(user.uid);
      this.isLoggedIn.next(true);
      this.router.navigate(['/']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  async logInWithGitHub(): Promise<void> {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      this.fireStore.addUser(user.displayName || 'Unknown');
      this.setUserName(user.uid);
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

  setUserName(userId: string): void {
    this.fireStore.getUser(userId).subscribe((x) => {
      const userInfo = x.map((item) => item.payload.doc.data()) as IUserInfo[];
      if (userInfo[0]) {
        this.authFacade.addUserName(userInfo[0].name);
      }
    });
  }

  errorHandling(error: Error): void {
    this.toasterService.show({
      type: 'error',
      title: error.name,
      body: error.message,
    });
  }
}
