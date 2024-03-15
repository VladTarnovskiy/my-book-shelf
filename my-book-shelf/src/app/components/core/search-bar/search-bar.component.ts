import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyDirective } from '@core/directives/destroy';
import { SearchService } from '@core/services/search';
import { TranslateModule } from '@ngx-translate/core';
import { switchMenuAnimation } from '@shared/animation';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '@shared/interfaces/filters';
import { BooksFacade } from '@store/books';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

import { filterTypeList } from './search-bar.constant';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [switchMenuAnimation],
})
export class SearchBarComponent implements OnInit {
  filterTypeList = filterTypeList;
  searchValue = new FormControl<string>('', {
    nonNullable: true,
  });
  isFilter = false;
  isFocus = false;
  filterType = new BehaviorSubject<FilterTypesKeys>('All');
  filterCategory: CategoryFilterKeys = 'Browse';
  elasticValues = new BehaviorSubject<string[]>([]);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private router: Router,
    private booksFacade: BooksFacade,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.booksFacade.searchOptions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        this.filterCategory = options.categoryFilterType;
        this.filterType.next(options.filterType);
        this.searchValue.setValue(options.searchValue);
      });

    this.searchValue.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.searchService
          .getSearchData({
            searchValue: this.searchValue.value,
            filterType: this.filterType.getValue(),
            categoryFilterType: this.filterCategory,
            page: 0,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe((searchValues) => {
            this.elasticValues.next(searchValues);
          });
      });
  }

  onFocus(): void {
    this.isFocus = true;
  }

  onBlur(): void {
    this.isFocus = false;
  }

  onSearch(): void {
    this.booksFacade.fetchBooks({
      searchValue: this.searchValue.value,
      filterType: this.filterType.getValue(),
      categoryFilterType: this.filterCategory,
      page: 0,
    });

    if (this.router.url !== '/search') {
      this.router.navigateByUrl('search');
    }
  }

  elasticSearch(value: string): void {
    this.searchValue.setValue(value);
    this.onSearch();
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
      this.filterType.next(
        el.getAttribute('data-filterType') as FilterTypesKeys
      );
      this.booksFacade.setFilterType(this.filterType.getValue());
    }
  }
}
