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
import { UserService } from '../user/user.service';
import { IUserDetails } from '../../../auth/models/user';
import { AuthFacade } from '../../../store/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private authFacade: AuthFacade,
    private userService: UserService,
    private toasterService: ToasterService
  ) {}

  async signUp({ email, password, name }: IUserDetails): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = this.auth.currentUser?.uid || null;
      const user = {
        name: name,
        userId,
      };
      this.userService.addUser(user);
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
      await sendEmailVerification(user.user);
      if (user.user.emailVerified) {
        this.router.navigate(['auth/verification/success']);
      } else {
        this.router.navigate(['auth/verification']);
        const interval = setInterval(async () => {
          if (user.user.emailVerified) {
            clearInterval(interval);
            this.isLoggedIn.next(true);
            this.router.navigate(['auth/verification/success']);
          }
          await user.user.reload();
        }, 2000);
      }
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
      const userId = this.auth.currentUser?.uid || null;
      const user = {
        name: result.user.displayName || 'Unknown',
        userId,
      };
      this.userService.addUser(user);
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
      const userId = this.auth.currentUser?.uid || null;
      const user = {
        name: result.user.displayName || 'Unknown',
        userId,
      };
      this.userService.addUser(user);
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

  getUserAfterReload(): void {
    this.authFacade.changeUserIsLoading(true);
    this.auth.onAuthStateChanged((user) => {
      if (user !== null) {
        this.setUserName(user.uid);
      } else {
        this.isLoggedIn.next(false);
        this.authFacade.changeUserIsLoading(false);
      }
    });
  }

  setUserName(userId: string): void {
    this.userService.getUser(userId).subscribe((user) => {
      const userInfo = user.payload.data();
      if (userInfo) {
        this.authFacade.addUserName(userInfo.name);
        this.authFacade.addUserId(userInfo.userId);
        this.authFacade.addUserPhoto(userInfo.photo);
        this.isLoggedIn.next(true);
      }
      this.authFacade.changeUserIsLoading(false);
    });
  }

  errorHandling(error: Error): void {
    this.toasterService.show({
      type: 'error',
      title: error.name,
      message: error.message,
    });
  }
}
