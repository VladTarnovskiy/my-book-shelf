import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CategoryFilterKeys } from '../../../shared/interfaces/filters';
import { Observable, Subscription } from 'rxjs';
import { BooksFacade } from '../../../store/books/books.facade';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  isFilter = false;
  filterCategory: CategoryFilterKeys = 'Browse';
  filterCategory$: Observable<CategoryFilterKeys> =
    this.booksFacade.filterCategoryType$;

  subscription!: Subscription;

  constructor(private booksFacade: BooksFacade) {}

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
      this.booksFacade.setCategoryFilterType(this.filterCategory);
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
