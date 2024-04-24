import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { IUserDetailsLoginForm } from '@shared/models/user';
import { ValidatePassword } from '@shared/validators';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    TranslateModule,
    NgClass,
    SvgIconComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup<IUserDetailsLoginForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, ValidatePassword()],
    }),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  onSubmit(): void {
    const formUserData = this.loginForm.getRawValue();

    if (this.loginForm.valid) {
      this.authService.login({
        email: formUserData.email,
        password: formUserData.password,
      });
    }
  }

  loginWithGoogle(): void {
    this.authService.logInWithGoogle();
  }

  loginWithGitHub(): void {
    this.authService.logInWithGitHub();
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
