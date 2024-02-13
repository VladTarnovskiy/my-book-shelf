import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoriteBookComponent } from '../../components/favorite-book/favorite-book.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IFavoriteBook } from '../../models/favoriteBook';
import { FavoriteFacade } from '../../../store/favorite/favorite.facade';
import { BooksFacade } from '../../../store/books/books.facade';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [FavoriteBookComponent, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  favoriteBooks$: Observable<IFavoriteBook[]> =
    this.favoriteFacade.favoriteBooks$;

  constructor(
    private favoriteFacade: FavoriteFacade,
    private booksFacade: BooksFacade
  ) {}

  removeFromFavorite(bookId: string): void {
    this.favoriteFacade.removeFavoriteBook(bookId);
    this.removeFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string): void {
    this.booksFacade.removeFavoriteStatus(bookId);
  }
}
