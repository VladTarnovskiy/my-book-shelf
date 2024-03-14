import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBooksComponent } from './my-books.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MyBookService } from '../../core/services/my-book/my-book.service';
import { Component } from '@angular/core';
import { MyBookComponent } from '../../components/my-books/my-book/my-book.component';

@Component({ standalone: true, selector: 'app-my-book', template: '' })
class MyBookStubComponent {}

describe('MyBooksComponent', () => {
  let component: MyBooksComponent;
  let fixture: ComponentFixture<MyBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBooksComponent, TranslateModule.forRoot()],
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
    })
      .overrideComponent(MyBooksComponent, {
        add: {
          imports: [MyBookStubComponent],
        },
        remove: {
          imports: [MyBookComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MyBooksComponent);
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
