import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBookComponent } from './home-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { bookDataStub } from '../../../shared/tests/bookStub';

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
    component.bookData = bookDataStub;
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
