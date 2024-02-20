import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CheckFileType(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File | null = control.value;

    if (file && file.name !== 'application/pdf') {
      console.log(file.name);
      return { forbiddenFileType: { value: 'Invalid file type' } };
    }

    return null;
  };
}
