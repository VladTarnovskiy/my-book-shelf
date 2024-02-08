import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let message = "your password isn't strong enough it should contain ";
    const inputValue = control.value as string;

    if (inputValue) {
      if (inputValue.length < 8) {
        message += 'at least 8 characters';
        return { forbiddenPassword: { value: message } };
      }
      if (!/[a-zA-Zа-яА-ЯёЁ]/.test(inputValue)) {
        message += 'letters';
        return { forbiddenPassword: { value: message } };
      }
      if (!/\d/.test(inputValue)) {
        message += 'numbers';
        return { forbiddenPassword: { value: message } };
      }
      if (!/[A-ZА-ЯЁ]/.test(inputValue)) {
        message += 'uppercase letters';
        return { forbiddenPassword: { value: message } };
      }
      if (!/[a-zа-яё]/.test(inputValue)) {
        message += 'lowercase letters';
        return { forbiddenPassword: { value: message } };
      }
      if (!/[!@#$%^&*]/.test(inputValue)) {
        message += 'at least one special character';
        return { forbiddenPassword: { value: message } };
      }
    }
    return null;
  };
}
