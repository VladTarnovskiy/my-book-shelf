import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private auth: Auth,
    private router: Router
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
      console.log(error);
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
      this.isLoggedIn.next(true);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
