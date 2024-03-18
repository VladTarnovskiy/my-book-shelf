import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreviewOptionsComponent } from '@components/preview/preview-options';
import { PreviewSkeletonComponent } from '@components/preview/preview-skeleton';
import { ReviewComponent } from '@components/preview/review';
import { DestroyDirective } from '@core/directives';
import { GoBackDirective } from '@core/directives';
import { RecentService } from '@core/services/recent';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { BooksFacade } from '@store/books';
import { filter, Observable, of, switchMap, takeUntil } from 'rxjs';

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
    private recentService: RecentService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.booksFacade.previewBookId$
      .pipe(
        takeUntil(this.destroy$),
        filter((bookId) => bookId !== undefined)
      )
      .subscribe((bookId) => {
        this.booksFacade.fetchPreviewBook(bookId);
      });
    this.book$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((book) => {
          if (book) {
            return this.recentService.addRecentBook(book);
          } else {
            return of();
          }
        })
      )
      .subscribe({
        error: () => {
          this.toasterService.showFireStoreError();
        },
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
