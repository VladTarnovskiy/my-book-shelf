import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteUploadBookComponent } from './favorite-upload-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoriteUploadBookComponent', () => {
  let component: FavoriteUploadBookComponent;
  let fixture: ComponentFixture<FavoriteUploadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoriteUploadBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteUploadBookComponent);
    component = fixture.componentInstance;
    component.uploadBookData = {
      borrowedOn: '2024',
      submissionDate: '2024',
      id: 'kksoEAAAQBAJ',
      isFavorite: false,
      title: 'Brandsmoor',
      author: 'Roman Helinski',
      image:
        'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      file: 'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      description: 'description',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input data', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(titleEl.textContent).toBe('Brandsmoor');
  });
});
