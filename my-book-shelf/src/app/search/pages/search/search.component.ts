import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CategoryFilterComponent, SearchBookComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {}
