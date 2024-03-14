import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { IUploadBook } from '../../models/upload';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { SafePipe } from '../../../core/pipes/safe/safe.pipe';
import { GoBackDirective } from '../../../core/directives/go-back/go-back.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { MyBookService } from '../../../core/services/my-book/my-book.service';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [SafePipe, GoBackDirective, TranslateModule, AsyncPipe, NgClass],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderComponent implements OnInit {
  book$ = new BehaviorSubject<IUploadBook | null>(null);
  book: IUploadBook | null = null;
  isFullScreen = new BehaviorSubject<boolean>(false);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private route: ActivatedRoute,
    private myBookService: MyBookService
  ) {}

  ngOnInit(): void {
    const myBookId = this.route.snapshot.params['myBookId'] as string;
    if (myBookId) {
      this.myBookService
        .getMyBook(myBookId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((book) => {
          const bookData = book.payload.data();
          if (bookData) {
            this.book = bookData;
            this.book$.next(bookData);
          }
        });
    }
  }

  toggleFavorite(): void {
    if (this.book) {
      this.myBookService.changeFavoriteStatus(
        !this.book.isFavorite,
        this.book.id
      );
    }
  }

  toggleFullScreen(): void {
    this.isFullScreen.next(!this.isFullScreen.getValue());
  }
}
