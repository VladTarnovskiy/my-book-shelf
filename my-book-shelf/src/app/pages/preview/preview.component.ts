import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBook } from '../../shared/models/book.model';
import { Observable, takeUntil } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { PreviewSkeletonComponent } from '../../components/preview/preview-skeleton/preview-skeleton.component';
import { PreviewOptionsComponent } from '../../components/preview/preview-options/preview-options.component';
import { BooksFacade } from '../../store/books/books.facade';
import { DestroyDirective } from '../../core/directives/destroy/destroy.directive';
import { GoBackDirective } from '../../core/directives/go-back/go-back.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewComponent } from '../../components/preview/review/review.component';
import { RecentService } from '../../core/services/recent/recent.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PreviewSkeletonComponent,
    PreviewOptionsComponent,
    GoBackDirective,
    TranslateModule,
    ReviewComponent,
    AsyncPipe,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  ratingItems = [...Array(5).keys()];
  book$: Observable<IBook | null> = this.booksFacade.previewBook$;
  isLoading$: Observable<boolean> = this.booksFacade.previewBookLoader$;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private booksFacade: BooksFacade,
    private recentService: RecentService
  ) {}

  ngOnInit(): void {
    this.booksFacade.previewBookId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookId) => {
        if (bookId) {
          this.booksFacade.fetchPreviewBook(bookId);
        }
      });
    this.book$.pipe(takeUntil(this.destroy$)).subscribe((book) => {
      if (book) {
        this.recentService.addRecentBook(book);
      }
    });
  }

  searchAuthorBooks(author: string): void {
    this.booksFacade.fetchBooks({
      searchValue: author,
      filterType: 'Author',
      categoryFilterType: 'Browse',
      page: 0,
    });
  }
}
