import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookComponent } from './search-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { bookDataStub } from '../../../shared/tests/bookStub';

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
    component.bookData = bookDataStub;
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
