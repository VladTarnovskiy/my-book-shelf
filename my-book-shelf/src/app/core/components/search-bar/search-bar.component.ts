import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryFilterKeys, FilterTypesKeys } from '../../interfaces/filters';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { BooksFacade } from '../../../store/books/books.facade';
import { DestroyDirective } from '../../directives/destroy/destroy.directive';
import { filterTypeList } from './search-bar.constant';
import { SearchService } from '../../services/search/search.service';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, AsyncPipe, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  hostDirectives: [DestroyDirective],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  filterTypeList = filterTypeList;
  searchValue = '';
  isFilter = false;
  isFocus = false;
  filterType: FilterTypesKeys = 'All';
  filterCategory: CategoryFilterKeys = 'Browse';
  elasticValues = new BehaviorSubject<string[] | null>(null);
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
        this.searchValue = options.searchValue;
        this.filterType = options.filterType;
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
      searchValue: this.searchValue,
      filterType: this.filterType,
      categoryFilterType: this.filterCategory,
      page: 1,
    });

    if (this.router.url !== '/search') {
      this.router.navigateByUrl('search');
    }
  }

  onChange(): void {
    this.searchService
      .getSearchData({
        searchValue: this.searchValue,
        filterType: this.filterType,
        categoryFilterType: this.filterCategory,
        page: 1,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchValues) => {
        this.elasticValues.next(searchValues);
      });
  }

  elasticSearch(value: string): void {
    this.searchValue = value;
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
    if (el.className === 'menu__item') {
      this.filterType = el.getAttribute('data-filterType') as FilterTypesKeys;
      this.booksFacade.setFilterType(this.filterType);
    }
  }
}
