import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrationComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new values', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_name'
    );
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_email'
    );
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_password'
    );
    const confirmPasswordInput: HTMLInputElement =
      fixture.nativeElement.querySelector('.form-item__input_confirm-pass');

    expect(component.registerForm.get('name')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('confirmPassword')?.value).toBe('');
    nameInput.value = 'Jake';
    emailInput.value = 'email@mail.ru';
    passwordInput.value = 'Qwerty1@';
    confirmPasswordInput.value = 'Qwerty1@';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.registerForm.get('name')?.value).toBe('Jake');
    expect(component.registerForm.get('email')?.value).toBe('email@mail.ru');
    expect(component.registerForm.get('password')?.value).toBe('Qwerty1@');
    expect(component.registerForm.get('confirmPassword')?.value).toBe(
      'Qwerty1@'
    );
  });

  it('should invalid form', () => {
    component.registerForm.setValue({
      name: '',
      email: 'invalid',
      password: 'invalid',
      confirmPassword: 'invalidPass',
    });

    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should valid form', () => {
    component.registerForm.setValue({
      name: 'Jake',
      email: 'valid@mail.com',
      password: 'Qwerty1@',
      confirmPassword: 'Qwerty1@',
    });

    expect(component.registerForm.valid).toBeTruthy();
  });
});
