import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MyBookService } from '@core/services/my-book';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ReaderComponent } from '.';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReaderComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: MyBookService,
          useValue: {
            getMyBooks: () => {
              return of();
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    component.book$.next({
      borrowedOn: '2024',
      submissionDate: '2024',
      id: 'edq32',
      isFavorite: false,
      title: 'Brandsmoor',
      author: 'Roman Helinski',
      image:
        'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      file: 'http://books.google.com/books/content?id=kksoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      description: 'descripption',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const titleEl: HTMLInputElement =
      fixture.nativeElement.querySelector('.description__name');
    expect(titleEl.textContent).toBe('Brandsmoor');
  });
});
