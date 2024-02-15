import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryFilterKeys, FilterTypesKeys } from '../../interfaces/filters';
import { Observable, takeUntil } from 'rxjs';
import { ISearchOptions } from '../../../search/interfaces/search';
import { BooksFacade } from '../../../store/books/books.facade';
import { DestroyDirective } from '../../directives/destroy';

const filterTypeList = ['All', 'Title', 'Author', 'Text', 'Subjects'];

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  hostDirectives: [DestroyDirective],
})
export class SearchBarComponent implements OnInit {
  filterTypeList = filterTypeList;
  searchValue = '';
  isFilter = false;
  filterType: FilterTypesKeys = 'All';
  filterCategory: CategoryFilterKeys = 'Browse';
  searchOptions$: Observable<ISearchOptions> = this.booksFacade.searchOptions$;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private booksFacade: BooksFacade
  ) {}

  onSearch(): void {
    this.booksFacade.fetchBooks(
      this.searchValue,
      this.filterType,
      this.filterCategory,
      1
    );

    if (this.router.url !== '/search') {
      this.router.navigateByUrl('search');
    }
  }

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
      this.filterType = el.getAttribute('data-filterType') as FilterTypesKeys;
      this.booksFacade.setFilterType(this.filterType);
    }
  }

  ngOnInit(): void {
    this.searchOptions$.pipe(takeUntil(this.destroy$)).subscribe((options) => {
      this.filterCategory = options.categoryFilterType;
      this.searchValue = options.searchValue;
      this.filterType = options.filterType;
      this.cd.detectChanges();
    });
  }
}
