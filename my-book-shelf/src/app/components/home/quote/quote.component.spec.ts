import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { QuoteComponent } from '.';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  const initialState = {
    quotes: {
      quote: {
        id: 123,
        quote: 'Darkness Cannot Drive Out Darkness',
        author: 'Martin Luther King Jr.',
      },
      isLoading: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteComponent, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain data from store', () => {
    const quoteEl: HTMLElement =
      fixture.nativeElement.querySelector('.content');
    const authorEl: HTMLElement =
      fixture.nativeElement.querySelector('.author');
    expect(quoteEl.textContent).toBe(' Darkness Cannot Drive Out Darkness ');
    expect(authorEl.textContent).toBe('-Martin Luther King Jr.');
  });
});
