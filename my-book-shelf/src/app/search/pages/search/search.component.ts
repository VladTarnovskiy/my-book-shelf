import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { SearchBookComponent } from '../../components/search-book/search-book.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { selectBooks } from '../../../store/books/selectors/books.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CategoryFilterComponent, SearchBookComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  books$: Observable<IBook[] | null> = this.store.select(selectBooks);
  constructor(private store: Store) {}
}
