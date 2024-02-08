import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryFilterKeys } from '../../../shared/interfaces/filters';
import { Store } from '@ngrx/store';
import { SetCategoryFilterType } from '../../../store/books/actions/books.action';
import { Observable, Subscription } from 'rxjs';
import { selectBookFilterCategoryType } from '../../../store/books/selectors/books.selector';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  isFilter = false;
  filterCategory: CategoryFilterKeys = 'Browse';
  filterCategory$: Observable<CategoryFilterKeys> = this.store.select(
    selectBookFilterCategoryType
  );

  subscription!: Subscription;

  constructor(private store: Store) {}

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
      this.filterCategory = el.getAttribute(
        'data-filterType'
      ) as CategoryFilterKeys;
      this.store.dispatch(
        SetCategoryFilterType({ categoryFilterType: this.filterCategory })
      );
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
