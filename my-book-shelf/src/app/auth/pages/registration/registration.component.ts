import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidateName } from '../../validators/name';
import { ValidatePassword } from '../../validators/password';
import { IUserDetails } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40), ValidateName()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, ValidatePassword()]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const formUserData = this.registerForm.getRawValue() as IUserDetails;
    if (this.registerForm.status === 'VALID') {
      console.log(formUserData);
    }
  }
}
