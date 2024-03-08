import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookComponent } from './search-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchBookComponent', () => {
  let component: SearchBookComponent;
  let fixture: ComponentFixture<SearchBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBookComponent);
    component = fixture.componentInstance;
    component.bookData = {
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
    const titleEl: HTMLElement = fixture.nativeElement.querySelector(
      '.description__title'
    );
    expect(titleEl.textContent).toBe('Brandsmoor');
  });
});
