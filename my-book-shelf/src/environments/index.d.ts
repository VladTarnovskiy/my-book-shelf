import { RecaptchaVerifier } from '@angular/fire/auth';

export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
