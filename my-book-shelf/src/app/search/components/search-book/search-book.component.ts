import { Component, Input } from '@angular/core';
import { IBook } from '../../../shared/models/book.model';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss',
})
export class SearchBookComponent {
  @Input({ required: true }) bookData!: IBook;
}
