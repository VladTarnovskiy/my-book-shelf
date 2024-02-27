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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
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
