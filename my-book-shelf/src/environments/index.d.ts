import { RecaptchaVerifier } from '@angular/fire/auth';

export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    google: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      books: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewer: any;
  }
}
