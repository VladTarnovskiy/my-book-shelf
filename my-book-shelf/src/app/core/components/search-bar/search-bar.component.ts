import { SetFilterType } from './../../../store/books/actions/books.action';
import { selectSearchOptions } from './../../../store/books/selectors/books.selector';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchBooks } from '../../../store/books/actions/books.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';
import { Observable, Subscription } from 'rxjs';
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
  searchOptions$: Observable<ISearchOptions> =
    this.store.select(selectSearchOptions);
  subscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSearch() {
    this.store.dispatch(
      FetchBooks({
        searchValue: this.searchValue,
        filterType: this.filterType,
        categoryFilterType: this.filterCategory,
        page: 1,
      })
    );
    if (this.router.url !== '/search') {
      this.router.navigateByUrl('search');
    }
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
      this.store.dispatch(SetFilterType({ filterType: this.filterType }));
    }
  }

  ngOnInit() {
    this.subscription = this.searchOptions$.subscribe((options) => {
      this.filterCategory = options.categoryFilterType;
      this.searchValue = options.searchValue;
      this.filterType = options.filterType;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
