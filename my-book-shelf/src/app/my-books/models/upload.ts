import { FormControl } from '@angular/forms';

export interface IUploadBook {
  title: string;
  author: string;
  description: string;
  file: string;
  image: string;
  id: string;
  borrowedOn: string;
  submissionDate: string;
}

export interface IUpLoadBookForm {
  title: FormControl<string>;
  author: FormControl<string>;
  description: FormControl<string>;
  file: FormControl<string>;
  image: FormControl<string>;
}
