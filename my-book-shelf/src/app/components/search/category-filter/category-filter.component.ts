import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DestroyDirective } from '@core/directives';
import { TranslateModule } from '@ngx-translate/core';
import { switchMenuAnimation } from '@shared/animation';
import { CategoryFilterKeys } from '@shared/interfaces/filters';
import { BooksFacade } from '@store/books';
import { takeUntil } from 'rxjs';

import { filterCategoryList } from './category-filter.constant';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
  animations: [switchMenuAnimation],
})
export class CategoryFilterComponent implements OnInit {
  filterCategoryList = filterCategoryList;
  isFilter = false;
  filterCategory: CategoryFilterKeys = 'Browse';
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private booksFacade: BooksFacade) {}

  ngOnInit(): void {
    this.booksFacade.filterCategoryType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filterCategory = value;
      });
  }

  onFilterToggle(): void {
    this.isFilter = !this.isFilter;
  }

  onFilterClose(): void {
    this.isFilter = false;
  }

  changeFilterType(event: Event): void {
    const el = event.target as HTMLDivElement;
    if (el.classList.contains('menu__item')) {
      this.filterCategory = el.getAttribute(
        'data-filterType'
      ) as CategoryFilterKeys;
      this.booksFacade.setCategoryFilterType(this.filterCategory);
    }
  }
}
