import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/search/category-filter/category-filter.component';
import { SearchBookSkeletonComponent } from '../../components/search/search-book-skeleton/search-book-skeleton.component';
import { SearchBookComponent } from '../../components/search/search-book/search-book.component';

@Component({ standalone: true, selector: 'app-category-filter', template: '' })
class CategoryFilterStubComponent {}

@Component({ standalone: true, selector: 'app-search-book', template: '' })
class SearchBookStubComponent {}

@Component({
  standalone: true,
  selector: 'app-search-book-skeleton',
  template: '',
})
class SearchBookSkeletonStubComponent {}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, TranslateModule.forRoot()],
      providers: [
        provideMockStore(),
        {
          provide: FavoriteService,
          useValue: {
            getFavoriteBooks: () => {
              return of();
            },
          },
        },
      ],
    })
      .overrideComponent(SearchComponent, {
        add: {
          imports: [
            CategoryFilterStubComponent,
            SearchBookStubComponent,
            SearchBookSkeletonStubComponent,
          ],
        },
        remove: {
          imports: [
            CategoryFilterComponent,
            SearchBookComponent,
            SearchBookSkeletonComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const titleEl: HTMLElement =
      fixture.nativeElement.querySelector('.titles__title');
    expect(titleEl).toBeDefined();
  });
});
