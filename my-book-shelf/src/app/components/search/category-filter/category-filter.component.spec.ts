import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CategoryFilterComponent } from '.';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  const initialState = {
    books: {
      books: [],
      totalItems: 0,
      previewBook: null,
      page: 1,
      searchValue: 'Test value',
      isLoading: false,
      isPreviewLoading: false,
      previewError: null,
      error: null,
      filterType: 'All',
      categoryFilterType: 'Browse',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoryFilterComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change category filter type', () => {
    component.isFilter = true;
    expect(component.filterCategory).toEqual('Browse');
    const menuItem: HTMLElement =
      fixture.nativeElement.querySelectorAll('.menu__item')[2];
    menuItem.click();
    expect(component.filterCategory).toEqual('Medical');
  });
});
