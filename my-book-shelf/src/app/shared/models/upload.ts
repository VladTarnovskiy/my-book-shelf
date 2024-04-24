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
  isFavorite: boolean;
}

export interface IFirestoreUploadBook {
  title: string;
  author: string;
  description: string;
  file: File | null;
  image: File | null;
  id: string;
  borrowedOn: string;
  submissionDate: string;
  isFavorite: boolean;
}

export interface IUpLoadBookForm {
  title: FormControl<string>;
  author: FormControl<string>;
  description: FormControl<string>;
  file: FormControl<File | null>;
  image: FormControl<File | null>;
}
