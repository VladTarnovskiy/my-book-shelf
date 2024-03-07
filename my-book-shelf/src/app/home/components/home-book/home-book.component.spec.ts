import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookComponent } from './home-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeBookComponent', () => {
  let component: HomeBookComponent;
  let fixture: ComponentFixture<HomeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBookComponent);
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
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(titleEl.textContent).toBe('Brandsmoor');
  });
});
