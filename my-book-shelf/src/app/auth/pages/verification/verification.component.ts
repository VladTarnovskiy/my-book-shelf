import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IVerification } from '../../models/verifications';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent {
  constructor(private authService: AuthService) {}

  verificationForm = new FormGroup<IVerification>({
    codeOne: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    codeTwo: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    codeThree: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    codeFour: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    codeFive: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    // const formUserData = this.verificationForm.getRawValue();
    if (this.verificationForm.valid) {
      // this.authService.signUp({
      //   email: formUserData.email,
      //   password: formUserData.password,
      // });
    }
  }
}
