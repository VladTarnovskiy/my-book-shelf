import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth';
import { TranslateModule } from '@ngx-translate/core';
import { IUserDetailsRegistrationForm } from '@shared/models/user';
import {
  ValidateConfirmPassword,
  ValidateName,
  ValidatePassword,
} from '@shared/validators';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    RouterLink,
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
    { validators: [ValidateConfirmPassword] }
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
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }
}
