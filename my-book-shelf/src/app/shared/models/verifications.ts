import { FormControl } from '@angular/forms';

export interface IVerification {
  codeOne: FormControl<string>;
  codeTwo: FormControl<string>;
  codeThree: FormControl<string>;
  codeFour: FormControl<string>;
  codeFive: FormControl<string>;
}
