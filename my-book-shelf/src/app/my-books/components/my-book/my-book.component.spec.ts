import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookComponent } from './my-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { myBookStub } from '../../../shared/tests/bookStub';

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
    component.bookData = myBookStub;
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
