import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [RouterLink, DatePipe, TranslateModule],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBookComponent {
  @Input({ required: true }) bookData!: IBook;
  @Output() addToFavoriteEvent = new EventEmitter<IBook>();
  @Output() removeFromFavoriteEvent = new EventEmitter<string>();

  addToFavorite(): void {
    this.addToFavoriteEvent.emit(this.bookData);
  }

  removeFromFavorite(): void {
    this.removeFromFavoriteEvent.emit(this.bookData.id);
  }
}
