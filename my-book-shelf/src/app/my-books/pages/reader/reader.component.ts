import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
  imports: [CommonModule, SafePipe, GoBackDirective, TranslateModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
  hostDirectives: [DestroyDirective],
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

  changeFavorite(isFavorite: boolean): void {
    if (this.book) {
      this.myBookService.changeFavoriteStatus(isFavorite, this.book.id);
    }
  }

  switchFullScreen(isFullScreen: boolean): void {
    this.isFullScreen.next(isFullScreen);
  }
}
