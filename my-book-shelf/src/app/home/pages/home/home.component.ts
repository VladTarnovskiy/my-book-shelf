import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { RouterModule } from '@angular/router';
import { BooksFacade } from '../../../store/books/books.facade';
import { RecommendedBooksFacade } from '../../../store/recommendedBooks/recommendedBooks.facade';
import { recommendedGenerator } from '../../../core/utils/recStubGenerator';
import { HomeBookSkeletonComponent } from '../../components/home-book-skeleton/home-book-skeleton.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuoteComponent,
    HomeBookComponent,
    CommonModule,
    RouterModule,
    HomeBookSkeletonComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  recentBooks$: Observable<IBook[]> = this.booksFacade.recentBooks$;
  recommendedBooks$: Observable<IBook[]> =
    this.recommendedBooksFacade.recommendedBooks$;
  recommendedBooksIsLoading$: Observable<boolean> =
    this.recommendedBooksFacade.recBooksIsLoading$;
  subscription!: Subscription;
  skeletonItems = [...Array(10).keys()];

  constructor(
    private booksFacade: BooksFacade,
    private recommendedBooksFacade: RecommendedBooksFacade
  ) {}

  ngOnInit(): void {
    const genSearchValue = recommendedGenerator();
    this.recommendedBooksFacade.fetchRecommendedBooks(genSearchValue);
  }

  getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (6 <= hours && hours < 12) {
      timeOfDay = 'MORNING';
    } else if (12 <= hours && hours < 18) {
      timeOfDay = 'AFTERNOON';
    } else if (18 <= hours && hours <= 24) {
      timeOfDay = 'EVENING';
    } else if (0 <= hours && hours < 6) {
      timeOfDay = 'NIGHT';
    }
    return timeOfDay;
  }
}
