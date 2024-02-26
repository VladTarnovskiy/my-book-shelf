import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
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
import { FirestoreService } from '../../../core/services/firestore/firestore.service';

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
    file: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private myBooksFacade: MyBooksFacade,
    private toasterService: ToasterService,
    private firestoreService: FirestoreService,
    private cd: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    const formUserData = this.uploadForm.getRawValue();
    if (this.uploadForm.valid) {
      // const readerFile = new FileReader();
      // readerFile.readAsDataURL(formUserData.file!);
      // const readerImg = new FileReader();
      // readerImg.readAsDataURL(formUserData.file!);

      const bookForStore = {
        ...formUserData,
        id: crypto.randomUUID(),
        isFavorite: false,
        borrowedOn: Date.now().toString(),
        submissionDate: String(Date.now() + 259200000),
      };

      const book = {
        ...formUserData,
        file: formUserData.file!.webkitRelativePath,
        image: formUserData.image!.webkitRelativePath,
        id: crypto.randomUUID(),
        isFavorite: false,
        borrowedOn: Date.now().toString(),
        submissionDate: String(Date.now() + 259200000),
      };
      this.myBooksFacade.addMyBook(book);
      this.firestoreService.addMyBook(bookForStore);
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
    // const reader = new FileReader();

    if (fileList && fileList[0]) {
      // reader.readAsDataURL(fileList[0]);
      // reader.onloadend = () => {
      this.uploadForm.patchValue({
        image: fileList[0],
      });
      this.cd.detectChanges();
      // };
    }
  }

  onSetFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    // const reader = new FileReader();

    if (fileList && fileList[0]) {
      // reader.readAsDataURL(fileList[0]);
      // reader.onloadend = () => {
      this.uploadForm.patchValue(
        {
          file: fileList[0],
        }
        // { emitEvent: true }
      );
      this.cd.detectChanges();
      // };
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
