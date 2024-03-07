import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookComponent } from './my-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyBookComponent', () => {
  let component: MyBookComponent;
  let fixture: ComponentFixture<MyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MyBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookComponent);
    component = fixture.componentInstance;
    component.bookData = {
      borrowedOn: '2024',
      submissionDate: '2024',
      id: 'kksoEAAAQBAJ',
      isFavorite: false,
      title: 'Brandsmoor',
      author: 'Roman Helinski',
      image:
        'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      file: 'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      description: 'descripption',
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
