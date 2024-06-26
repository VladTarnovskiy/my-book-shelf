import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MyBooksService } from '@core/services/my-books';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';

import { UploadComponent } from '.';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UploadComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: MyBooksService,
          useValue: {},
        },
        {
          provide: ToasterService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new values', () => {
    const title: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_title'
    );
    const author: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_author'
    );
    const description: HTMLInputElement = fixture.nativeElement.querySelector(
      '.form-item__input_description'
    );

    expect(component.uploadForm.get('title')?.value).toBe('');
    expect(component.uploadForm.get('author')?.value).toBe('');
    expect(component.uploadForm.get('description')?.value).toBe('');
    title.value = 'Cat Book';
    author.value = 'Jake Jake';
    description.value = 'Good book';
    title.dispatchEvent(new Event('input'));
    author.dispatchEvent(new Event('input'));
    description.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.uploadForm.get('title')?.value).toBe('Cat Book');
    expect(component.uploadForm.get('author')?.value).toBe('Jake Jake');
    expect(component.uploadForm.get('description')?.value).toBe('Good book');
  });

  it('should invalid form', () => {
    component.uploadForm.setValue({
      title: '',
      author: 'invalid',
      description: 'invalid',
      file: null,
      image: null,
    });

    expect(component.uploadForm.valid).toBeFalsy();
  });
});
