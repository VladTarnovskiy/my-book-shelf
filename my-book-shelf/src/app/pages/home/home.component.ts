import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeBookComponent } from '@components/home/home-book';
import { HomeBookSkeletonComponent } from '@components/home/home-book-skeleton';
import { QuoteComponent } from '@components/home/quote';
import { DestroyDirective } from '@core/directives/destroy';
import { RecentService } from '@core/services/recent';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { recommendedGenerator } from '@shared/utils';
import { RecommendedBooksFacade } from '@store/recommendedBooks';
import { BehaviorSubject, Observable, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuoteComponent,
    HomeBookComponent,
    RouterLink,
    HomeBookSkeletonComponent,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class HomeComponent implements OnInit {
  recentBooks$ = new BehaviorSubject<IBook[] | null>(null);
  recommendedBooks$: Observable<IBook[]> =
    this.recommendedBooksFacade.recommendedBooks$;
  recommendedBooksIsLoading$: Observable<boolean> =
    this.recommendedBooksFacade.recBooksIsLoading$;
  subscription!: Subscription;
  skeletonItems = [...Array(10).keys()];
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private recommendedBooksFacade: RecommendedBooksFacade,
    private recentService: RecentService
  ) {}

  ngOnInit(): void {
    const genSearchValue = recommendedGenerator();
    this.recommendedBooksFacade.fetchRecommendedBooks(genSearchValue);
    this.recentService
      .getRecentBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksData = books.map((book) => book.payload.doc.data());
        this.recentBooks$.next(booksData);
      });
  }

  getTimeOfDay(): string {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (6 <= hours && hours < 12) {
      timeOfDay = 'MORNING';
    } else if (12 <= hours && hours < 18) {
      timeOfDay = 'AFTERNOON';
    } else if (18 <= hours && hours <= 24) {
      timeOfDay = 'EVENING';
    } else {
      timeOfDay = 'NIGHT';
    }
    return timeOfDay;
  }
}
