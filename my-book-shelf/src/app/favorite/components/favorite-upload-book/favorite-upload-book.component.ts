import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IUploadBook } from '../../../my-books/models/upload';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-favorite-upload-book',
  standalone: true,
  imports: [RouterLink, DatePipe, TranslateModule],
  templateUrl: './favorite-upload-book.component.html',
  styleUrl: './favorite-upload-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteUploadBookComponent {
  @Input({ required: true }) uploadBookData!: IUploadBook;
  @Output() removeFromUploadFavoriteEvent = new EventEmitter<string>();

  removeFromUploadFavorite(): void {
    this.removeFromUploadFavoriteEvent.emit(this.uploadBookData.id);
  }
}
