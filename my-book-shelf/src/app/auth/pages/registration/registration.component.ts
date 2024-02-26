import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidateName } from '../../validators/name';
import { ValidatePassword } from '../../validators/password';
import { CommonModule } from '@angular/common';
import { IUserDetailsRegistrationForm } from '../../models/user';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirmPassword';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  constructor(private authService: AuthService) {}

  registerForm = new FormGroup<IUserDetailsRegistrationForm>(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(40),
          ValidateName(),
        ],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, ValidatePassword()],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
      }),
    },
    { validators: [confirmPasswordValidator] }
  );

  onSubmit(): void {
    const formUserData = this.registerForm.getRawValue();
    if (this.registerForm.valid) {
      this.authService.signUp({
        email: formUserData.email,
        password: formUserData.password,
        name: formUserData.name,
      });
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
