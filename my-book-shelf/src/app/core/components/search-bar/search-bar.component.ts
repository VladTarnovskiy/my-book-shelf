import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchBooks } from '../../../store/books/actions/books.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  FilterCategoryKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';
import { Observable, Subscription } from 'rxjs';
import { selectBookFilterCategoryType } from '../../../store/books/selectors/books.selector';

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
  filterCategory: FilterCategoryKeys = 'Browse';
  filterCategory$: Observable<FilterCategoryKeys> = this.store.select(
    selectBookFilterCategoryType
  );
  subscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSearch() {
    this.router.navigateByUrl('search');
    this.store.dispatch(
      FetchBooks({
        searchValue: this.searchValue,
        filterType: this.filterType,
        categoryFilterType: this.filterCategory,
      })
    );
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
    this.subscription = this.filterCategory$.subscribe((value) => {
      this.filterCategory = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
