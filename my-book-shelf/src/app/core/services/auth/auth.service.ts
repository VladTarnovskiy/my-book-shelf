import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUserDetails } from '@shared/models/user';
import { BehaviorSubject } from 'rxjs';

import { ToasterService } from '../toaster';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
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
      if (error instanceof HttpErrorResponse) {
        this.toasterService.showHttpsError(error);
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
      if (error instanceof HttpErrorResponse) {
        this.toasterService.showHttpsError(error);
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
      if (error instanceof HttpErrorResponse) {
        this.toasterService.showHttpsError(error);
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
      if (error instanceof HttpErrorResponse) {
        this.toasterService.showHttpsError(error);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.toasterService.showHttpsError(error);
      }
    }
  }
}
