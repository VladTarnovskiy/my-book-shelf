import { FormControl } from '@angular/forms';

export interface IUserDetails {
  password: string;
  email: string;
  name: string;
}

export interface IUserDetailsRegistrationForm {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  email: FormControl<string>;
  name: FormControl<string>;
}

export interface IUserDetailsLoginForm {
  password: FormControl<string>;
  email: FormControl<string>;
}
