import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IUpLoadBookForm } from '../../models/upload';
import { CommonModule } from '@angular/common';
import { MyBooksFacade } from '../../../store/my-books/my-books.facade';
import { ToasterService } from '../../../core/services/toaster/toaster.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    file: new FormControl<string | ArrayBuffer | null>(null, {
      validators: [Validators.required],
    }),
    image: new FormControl<string | ArrayBuffer | null>(null, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private myBooksFacade: MyBooksFacade,
    private toasterService: ToasterService
  ) {}

  onSubmit(): void {
    const formUserData = this.uploadForm.getRawValue();
    if (this.uploadForm.valid) {
      this.myBooksFacade.addMyBook({
        ...formUserData,
        id: crypto.randomUUID(),
        isFavorite: false,
      });
      this.toasterService.show({
        type: 'success',
        title: 'My book',
        body: 'The book was created!',
      });
      this.uploadForm.reset();
    }
  }

  onSetImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const reader = new FileReader();

    if (fileList && fileList[0]) {
      reader.readAsDataURL(fileList[0]);
      reader.onload = () => {
        this.uploadForm.patchValue({
          image: reader.result,
        });
      };
    }
  }

  onSetFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const reader = new FileReader();

    if (fileList && fileList[0]) {
      reader.readAsDataURL(fileList[0]);
      reader.onload = () => {
        this.uploadForm.patchValue({
          file: reader.result,
        });
      };
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
