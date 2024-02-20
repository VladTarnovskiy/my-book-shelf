import { FormControl } from '@angular/forms';

export interface IUploadBook {
  title: string;
  author: string;
  description: string;
  file: string | ArrayBuffer | null;
  image: string | ArrayBuffer | null;
  id: string;
  borrowedOn: string;
  submissionDate: string;
  isFavorite: boolean;
}

export interface IUpLoadBookForm {
  title: FormControl<string>;
  author: FormControl<string>;
  description: FormControl<string>;
  file: FormControl<string | ArrayBuffer | null>;
  image: FormControl<string | ArrayBuffer | null>;
}
