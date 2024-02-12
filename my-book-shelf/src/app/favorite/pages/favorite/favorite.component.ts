import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoriteBookComponent } from '../../components/favorite-book/favorite-book.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavoriteBooks } from '../../../store/favorite/selectors/favorite.selector';
import { CommonModule } from '@angular/common';
import { IFavoriteBook } from '../../models/favoriteBook';
import { RemoveFavoriteBook } from '../../../store/favorite/actions/favorite.action';
import { RemoveFavoriteStatus } from '../../../store/books/actions/books.action';

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
    this.store.select(selectFavoriteBooks);
  constructor(private store: Store) {}

  removeFromFavorite(bookId: string) {
    this.store.dispatch(RemoveFavoriteBook({ bookId }));
    this.removeFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string) {
    this.store.dispatch(RemoveFavoriteStatus({ bookId }));
  }
}
