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
import { BehaviorSubject, from, switchMap } from 'rxjs';

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
    from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(() => {
          const userId = this.auth.currentUser?.uid || null;
          const user = {
            name: name,
            userId,
          };
          return this.userService.addUser(user);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['auth/login']);
        },
        error: (error) => {
          const err = error as HttpErrorResponse;
          this.toasterService.showHttpsError(err);
        },
      });
  }

  async login({ email, password }: Omit<IUserDetails, 'name'>): Promise<void> {
    console.log('here');
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
      const err = error as HttpErrorResponse;
      this.toasterService.showHttpsError(err);
    }
  }

  async logInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    from(signInWithPopup(this.auth, provider))
      .pipe(
        switchMap((result) => {
          const userId = this.auth.currentUser?.uid || null;
          const user = {
            name: result.user.displayName || 'Unknown',
            userId,
          };
          return this.userService.addUser(user);
        })
      )
      .subscribe({
        next: () => {
          this.isLoggedIn.next(true);
          this.router.navigate(['/']);
        },
        error: (error) => {
          const err = error as HttpErrorResponse;
          this.toasterService.showHttpsError(err);
        },
      });
  }

  async logInWithGitHub(): Promise<void> {
    const provider = new GithubAuthProvider();
    from(signInWithPopup(this.auth, provider))
      .pipe(
        switchMap((result) => {
          const userId = this.auth.currentUser?.uid || null;
          const user = {
            name: result.user.displayName || 'Unknown',
            userId,
          };
          return this.userService.addUser(user);
        })
      )
      .subscribe({
        next: () => {
          this.isLoggedIn.next(true);
          this.router.navigate(['/']);
        },
        error: (error) => {
          const err = error as HttpErrorResponse;
          this.toasterService.showHttpsError(err);
        },
      });
  }

  async logout(): Promise<void> {
    from(signOut(this.auth)).subscribe({
      error: (error) => {
        const err = error as HttpErrorResponse;
        this.toasterService.showHttpsError(err);
      },
    });
  }
}
