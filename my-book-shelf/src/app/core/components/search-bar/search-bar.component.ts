import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchBooks } from '../../../store/books/actions/books.action';
import { Store } from '@ngrx/store';

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

  constructor(private store: Store) {}

  onSearch() {
    this.store.dispatch(FetchBooks({ searchValue: this.searchValue }));
  }

  onFilterToggle() {
    this.isFilter = !this.isFilter;
  }
}
