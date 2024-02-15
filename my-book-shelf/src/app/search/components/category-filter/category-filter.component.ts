import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CategoryFilterKeys } from '../../../core/interfaces/filters';
import { Observable, takeUntil } from 'rxjs';
import { BooksFacade } from '../../../store/books/books.facade';
import { DestroyDirective } from '../../../core/directives/destroy';

const filterCategoryList = [
  'Browse',
  'Engineering',
  'Medical',
  'Arts & Science',
  'Architecture',
  'Law',
];

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class CategoryFilterComponent implements OnInit {
  filterCategoryList = filterCategoryList;
  isFilter = false;
  filterCategory: CategoryFilterKeys = 'Browse';
  filterCategory$: Observable<CategoryFilterKeys> =
    this.booksFacade.filterCategoryType$;
  destroy$ = inject(DestroyDirective).destroy$;

  constructor(private booksFacade: BooksFacade) {}

  onFilterToggle(): void {
    this.isFilter = !this.isFilter;
  }

  onFilterClose(): void {
    setTimeout(() => {
      this.isFilter = false;
    }, 300);
  }

  changeFilterType(event: Event): void {
    const el = event.target as HTMLDivElement;
    if (el.className === 'menu__item') {
      this.filterCategory = el.getAttribute(
        'data-filterType'
      ) as CategoryFilterKeys;
      this.booksFacade.setCategoryFilterType(this.filterCategory);
    }
  }

  ngOnInit(): void {
    this.filterCategory$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.filterCategory = value;
    });
  }
}
