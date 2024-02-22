import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUploadBook } from '../../../my-books/models/upload';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite-upload-book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite-upload-book.component.html',
  styleUrl: './favorite-upload-book.component.scss',
})
export class FavoriteUploadBookComponent {
  @Input({ required: true }) uploadBookData!: IUploadBook;
  @Output() removeFromUploadFavoriteEvent = new EventEmitter<string>();

  removeFromUploadFavorite(): void {
    this.removeFromUploadFavoriteEvent.emit(this.uploadBookData.id);
  }
}
