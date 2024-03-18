import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyBooksService } from '@core/services/my-books';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IUpLoadBookForm } from '@shared/models/upload';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslateModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  uploadForm = new FormGroup<IUpLoadBookForm>({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    file: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private toasterService: ToasterService,
    private myBookService: MyBooksService,
    private translateService: TranslateService
  ) {}

  onSubmit(): void {
    const formUserData = this.uploadForm.getRawValue();
    if (this.uploadForm.valid) {
      const bookForFirestore = {
        ...formUserData,
        id: crypto.randomUUID(),
        isFavorite: false,
        borrowedOn: Date.now().toString(),
        submissionDate: String(Date.now() + 259200000),
      };
      this.myBookService.addMyBook(bookForFirestore);
      this.toasterService.show({
        type: 'success',
        title: this.translateService.instant('UPLOAD.MESSAGES.TITLE'),
        message: this.translateService.instant('UPLOAD.MESSAGES.MESSAGE'),
      });
      this.uploadForm.reset();
    }
  }

  onSetImage(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      this.uploadForm.patchValue({
        image: fileList[0],
      });
    }
  }

  onSetFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      this.uploadForm.patchValue({
        file: fileList[0],
      });
    }
  }

  get title() {
    return this.uploadForm.controls.title;
  }

  get author() {
    return this.uploadForm.controls.author;
  }

  get description() {
    return this.uploadForm.controls.description;
  }

  get file() {
    return this.uploadForm.controls.file;
  }

  get image() {
    return this.uploadForm.controls.image;
  }
}
