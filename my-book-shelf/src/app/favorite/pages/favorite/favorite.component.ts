import { Component } from '@angular/core';
import { FavoriteBookComponent } from '../../components/favorite-book/favorite-book.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [FavoriteBookComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent {}
