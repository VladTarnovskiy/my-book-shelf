import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@core/services/auth';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from '.';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: () => {
              return;
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new values', () => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_email'
    );
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_password'
    );
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    emailInput.value = 'email@mail.ru';
    passwordInput.value = 'Qwerty1@';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    expect(component.loginForm.get('email')?.value).toBe('email@mail.ru');
    expect(component.loginForm.get('password')?.value).toBe('Qwerty1@');
  });

  it('should invalid form', () => {
    component.loginForm.setValue({
      email: 'invalid',
      password: 'invalid',
    });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should valid form', () => {
    component.loginForm.setValue({
      email: 'valid@mail.com',
      password: 'Qwerty1@',
    });

    expect(component.loginForm.valid).toBeTruthy();
  });
});
