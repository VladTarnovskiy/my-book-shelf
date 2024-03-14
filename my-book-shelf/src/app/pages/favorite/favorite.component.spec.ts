import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { FavoriteBookComponent } from '../../components/favorite/favorite-book/favorite-book.component';
import { FavoriteUploadBookComponent } from '../../components/favorite/favorite-upload-book/favorite-upload-book.component';
import { MyBookService } from '../../core/services/my-book/my-book.service';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

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
          provide: MyBookService,
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
