import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { myBookStub } from '@shared/tests';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { MyBookComponent } from '.';

describe('MyBookComponent', () => {
  let component: MyBookComponent;
  let fixture: ComponentFixture<MyBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MyBookComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [provideAngularSvgIcon()],
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
