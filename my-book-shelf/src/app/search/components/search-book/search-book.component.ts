import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() addToFavoriteEvent = new EventEmitter<IBook>();
  @Output() removeFromFavoriteEvent = new EventEmitter<string>();

  addToFavorite() {
    this.addToFavoriteEvent.emit(this.bookData);
  }

  removeFromFavorite() {
    this.removeFromFavoriteEvent.emit(this.bookData.id);
  }
}
