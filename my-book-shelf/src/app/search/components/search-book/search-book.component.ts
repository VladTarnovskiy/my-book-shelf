import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IBook } from '../../../shared/models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AddRecentBook } from '../../../store/books/actions/books.action';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBookComponent {
  @Input({ required: true }) bookData!: IBook;
  @Output() addToFavoriteEvent = new EventEmitter<IBook>();
  @Output() removeFromFavoriteEvent = new EventEmitter<string>();

  constructor(private store: Store) {}

  addToFavorite() {
    this.addToFavoriteEvent.emit(this.bookData);
  }

  removeFromFavorite() {
    this.removeFromFavoriteEvent.emit(this.bookData.id);
  }

  addBookToRecent() {
    this.store.dispatch(AddRecentBook({ recentBook: this.bookData }));
  }
}
