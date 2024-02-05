import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchBooks } from '../../../store/books/actions/books.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FilterTypesKeys } from '../../../shared/interfaces/filters';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchValue = '';
  isFilter = false;
  filterType: FilterTypesKeys = 'All';

  constructor(
    private store: Store,
    private router: Router
  ) {}

  onSearch() {
    this.router.navigateByUrl('search');
    this.store.dispatch(
      FetchBooks({ searchValue: this.searchValue, filterType: this.filterType })
    );
  }

  onFilterToggle() {
    this.isFilter = !this.isFilter;
  }

  changeFilterType(event: Event) {
    const el = event.target as HTMLDivElement;
    if (el.className === 'menu__item') {
      this.filterType = el.getAttribute('data-filterType') as FilterTypesKeys;
      console.log(this.filterType);
    }
  }
}
