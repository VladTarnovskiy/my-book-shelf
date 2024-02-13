import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IFavoriteBook } from '../../models/favoriteBook';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-book.component.html',
  styleUrl: './favorite-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteBookComponent {
  @Input({ required: true }) bookData!: IFavoriteBook;
  @Output() removeFromFavoriteEvent = new EventEmitter<string>();

  removeFromFavorite(): void {
    this.removeFromFavoriteEvent.emit(this.bookData.id);
  }
}
