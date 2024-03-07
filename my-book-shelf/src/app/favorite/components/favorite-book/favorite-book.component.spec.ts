import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBookComponent } from './favorite-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavoriteBookComponent', () => {
  let component: FavoriteBookComponent;
  let fixture: ComponentFixture<FavoriteBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoriteBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteBookComponent);
    component = fixture.componentInstance;
    component.bookData = {
      borrowedOn: '2024',
      submissionDate: '2024',
      id: 'kksoEAAAQBAJ',
      isFavorite: false,
      title: 'Brandsmoor',
      authors: ['Roman Helinski'],
      publishedDate: '2021-05-25',
      images: {
        small:
          'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        normal:
          'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      categories: ['Fiction'],
      ISBN: '9048844452',
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
