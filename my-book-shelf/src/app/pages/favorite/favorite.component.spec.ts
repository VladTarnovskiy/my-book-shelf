import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteBookComponent } from '@components/favorite/favorite-book';
import { FavoriteUploadBookComponent } from '@components/favorite/favorite-upload-book';
import { FavoriteService } from '@core/services/favorite';
import { MyBooksService } from '@core/services/my-books';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FavoriteComponent } from '.';

@Component({ standalone: true, selector: 'app-favorite-book', template: '' })
class FavoriteBookStubComponent {}

@Component({
  standalone: true,
  selector: 'app-favorite-upload-book',
  template: '',
})
class FavoriteUploadBookStubComponent {}

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteComponent, TranslateModule.forRoot()],
      providers: [
        provideMockStore({}),
        {
          provide: FavoriteService,
          useValue: {
            getFavoriteBooks: () => {
              return of();
            },
          },
        },
        {
          provide: MyBooksService,
          useValue: {
            getMyBooks: () => {
              return of();
            },
          },
        },
      ],
    })
      .overrideComponent(FavoriteComponent, {
        add: {
          imports: [FavoriteBookStubComponent, FavoriteUploadBookStubComponent],
        },
        remove: {
          imports: [FavoriteBookComponent, FavoriteUploadBookComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const titleEl: HTMLInputElement =
      fixture.nativeElement.querySelector('.title');
    expect(titleEl).toBeTruthy();
  });
});
