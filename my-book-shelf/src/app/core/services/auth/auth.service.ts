import { Injectable } from '@angular/core';
import {
  Auth,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../toaster/toaster.service';

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
    private toaster: ToasterService
  ) {}

  async signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['auth/login']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.auth.languageCode = 'it';
      this.onSendCode(); //temporary solution
      this.isLoggedIn.next(true);
      this.router.navigate(['/']);
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandling(error);
      }
    }
  }

  onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            this.onSendCode();
          },
          'expired-callback': () => {},
        }
      );
    }
  }

  onSendCode() {
    this.onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(this.auth, '+375255011513', appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });
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
