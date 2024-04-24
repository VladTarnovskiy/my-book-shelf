import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from '@core/services/search';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SearchBarComponent } from '.';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

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
    const searchService = jasmine.createSpyObj('SearchService', [
      'getSearchData',
    ]);
    searchService.getSearchData.and.returnValue(of(['lorem', 'lorem']));

    await TestBed.configureTestingModule({
      imports: [
        SearchBarComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
        { provide: SearchService, useValue: searchService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search value from store', () => {
    const inputElement: HTMLElement =
      fixture.nativeElement.querySelector('.input');
    inputElement.dispatchEvent(new Event('input'));
    expect(component.searchValue.value).toBe('Test value');
  });

  it('elastic search data after change input value', fakeAsync(() => {
    const inputElement: HTMLElement =
      fixture.nativeElement.querySelector('.input');
    inputElement.dispatchEvent(new Event('input'));
    tick(600);
    const elasticValues = component.elasticValues.getValue();
    expect(elasticValues).toEqual(['lorem', 'lorem']);
  }));

  it('change filter type', () => {
    component.isFilter = true;
    expect(component.filterType.getValue()).toEqual('All');
    const menuItem: HTMLElement =
      fixture.nativeElement.querySelectorAll('.menu__item')[1];
    menuItem.click();
    expect(component.filterType.getValue()).toEqual('Title');
  });
});
