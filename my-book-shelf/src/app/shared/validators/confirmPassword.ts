import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ValidateConfirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { passwordNoMatch: true };
};
