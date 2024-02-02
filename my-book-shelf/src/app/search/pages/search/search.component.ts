import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CategoryFilterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {}
