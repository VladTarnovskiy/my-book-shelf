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
import { IFavoriteBook } from '@shared/models/favoriteBook';

@Component({
  selector: 'app-favorite-book',
  standalone: true,
  imports: [RouterLink, TranslateModule, DatePipe],
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
