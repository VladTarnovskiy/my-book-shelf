import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatePassword } from '../../validators/password';
import { CommonModule } from '@angular/common';
import { IUserDetailsLoginForm } from '../../models/user';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup<IUserDetailsLoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, ValidatePassword()],
    }),
  });

  onSubmit() {
    const formUserData = this.loginForm.getRawValue();
    console.log(formUserData);
    console.log(this.loginForm.status);

    if (this.loginForm.status === 'VALID') {
      this.authService.login({
        email: formUserData.email,
        password: formUserData.password,
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
