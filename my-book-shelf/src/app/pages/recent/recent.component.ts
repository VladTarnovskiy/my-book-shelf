import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HomeBookComponent } from '@components/home/home-book';
import { HomeBookSkeletonComponent } from '@components/home/home-book-skeleton';
import { DestroyDirective } from '@core/directives';
import { RecentService } from '@core/services/recent';
import { ToasterService } from '@core/services/toaster';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { BehaviorSubject, catchError, map, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [
    AsyncPipe,
    HomeBookComponent,
    TranslateModule,
    HomeBookSkeletonComponent,
  ],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class RecentComponent implements OnInit {
  recentBooks$ = new BehaviorSubject<IBook[] | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = inject(DestroyDirective).destroy$;
  skeletonItems = [...Array(10).keys()];

  constructor(
    private recentService: RecentService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.recentService
      .getRecentBooks()
      .pipe(
        takeUntil(this.destroy$),
        map((books) => books.map((book) => book.payload.doc.data())),
        catchError(() => {
          this.toasterService.showFireStoreError();
          this.isLoading$.next(false);
          return of();
        })
      )
      .subscribe((booksData) => {
        this.recentBooks$.next(booksData);
        this.isLoading$.next(false);
      });
  }
}
