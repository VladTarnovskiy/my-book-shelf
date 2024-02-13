import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';
import { Observable, Subscription } from 'rxjs';
import { ISearchOptions } from '../../../search/interfaces/search';
import { BooksFacade } from '../../../store/books/books.facade';

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
  searchOptions$: Observable<ISearchOptions> = this.booksFacade.searchOptions$;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private booksFacade: BooksFacade
  ) {}

  onSearch() {
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
      this.booksFacade.setFilterType(this.filterType);
    }
  }

  ngOnInit() {
    this.subscription = this.searchOptions$.subscribe((options) => {
      this.filterCategory = options.categoryFilterType;
      this.searchValue = options.searchValue;
      this.filterType = options.filterType;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
