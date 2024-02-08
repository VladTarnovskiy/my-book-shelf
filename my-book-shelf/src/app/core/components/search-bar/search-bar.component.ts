import { selectSearchOptions } from './../../../store/books/selectors/books.selector';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FetchBooks,
  SetSearchPage,
} from '../../../store/books/actions/books.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';
import { Observable, Subscription } from 'rxjs';
import { selectBookFilterCategoryType } from '../../../store/books/selectors/books.selector';
import { ISearchOptions } from '../../../search/interfaces/search';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchValue = '';
  isFilter = false;
  filterType: FilterTypesKeys = 'All';
  filterCategory: CategoryFilterKeys = 'Browse';
  filterCategory$: Observable<CategoryFilterKeys> = this.store.select(
    selectBookFilterCategoryType
  );
  searchOptions$: Observable<ISearchOptions> =
    this.store.select(selectSearchOptions);
  page = 1;
  subscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSearch() {
    this.setDefaultSearchPage();
    this.router.navigateByUrl('search');
    this.store.dispatch(
      FetchBooks({
        searchValue: this.searchValue,
        filterType: this.filterType,
        categoryFilterType: this.filterCategory,
        page: this.page,
      })
    );
  }

  setDefaultSearchPage() {
    this.store.dispatch(SetSearchPage({ page: 1 }));
  }

  onFilterToggle() {
    this.isFilter = !this.isFilter;
  }

  onFilterClose() {
    setTimeout(() => {
      this.isFilter = false;
    }, 300);
  }

  changeFilterType(event: Event) {
    const el = event.target as HTMLDivElement;
    if (el.className === 'menu__item') {
      this.filterType = el.getAttribute('data-filterType') as FilterTypesKeys;
    }
  }

  ngOnInit() {
    this.subscription = this.searchOptions$.subscribe((options) => {
      this.filterCategory = options.categoryFilterType;
      this.searchValue = options.searchValue;
      this.filterCategory = options.categoryFilterType;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
