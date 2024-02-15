import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IUpLoadBookForm } from '../../models/upload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  uploadForm = new FormGroup<IUpLoadBookForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    file: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    const formUserData = this.uploadForm.getRawValue();
    if (this.uploadForm.status === 'VALID') {
      console.log(formUserData);
    }
  }

  get title() {
    return this.uploadForm.get('title');
  }

  get author() {
    return this.uploadForm.get('author');
  }

  get description() {
    return this.uploadForm.get('description');
  }

  get file() {
    return this.uploadForm.get('file');
  }

  get image() {
    return this.uploadForm.get('image');
  }
}
