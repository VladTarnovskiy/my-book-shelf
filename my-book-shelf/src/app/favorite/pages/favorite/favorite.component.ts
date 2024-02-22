import { MyBooksFacade } from './../../../store/my-books/my-books.facade';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoriteBookComponent } from '../../components/favorite-book/favorite-book.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IFavoriteBook } from '../../models/favoriteBook';
import { FavoriteFacade } from '../../../store/favorite/favorite.facade';
import { BooksFacade } from '../../../store/books/books.facade';
import { IUploadBook } from '../../../my-books/models/upload';
import { FavoriteUploadBookComponent } from '../../components/favorite-upload-book/favorite-upload-book.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [FavoriteBookComponent, CommonModule, FavoriteUploadBookComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  favoriteBooks$: Observable<IFavoriteBook[]> =
    this.favoriteFacade.favoriteBooks$;
  uploadFavoriteBooks$: Observable<IUploadBook[]> =
    this.myBookFacade.selectedMyBooksFavorite$;

  constructor(
    private favoriteFacade: FavoriteFacade,
    private myBookFacade: MyBooksFacade,
    private booksFacade: BooksFacade
  ) {}

  removeFromFavorite(bookId: string): void {
    this.favoriteFacade.removeFavoriteBook(bookId);
    this.removeFavoriteStatus(bookId);
  }

  removeFavoriteStatus(bookId: string): void {
    this.booksFacade.removeFavoriteStatus(bookId);
  }

  removeFromUploadFavorite(uploadBookId: string): void {
    this.myBookFacade.removeMyBookFromFavorite(uploadBookId);
  }
}
