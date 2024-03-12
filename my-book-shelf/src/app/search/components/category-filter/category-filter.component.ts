import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CategoryFilterKeys } from '../../../core/interfaces/filters';
import { takeUntil } from 'rxjs';
import { BooksFacade } from '../../../store/books/books.facade';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { filterCategoryList } from './category-filter.constant';
import { TranslateModule } from '@ngx-translate/core';
import { switchMenuAnimation } from '../../../shared/animation/switchMenu';

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
