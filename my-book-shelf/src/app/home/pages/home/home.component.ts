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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent, HomeBookComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  testBooksData = testBookData;
  recentBooks$: Observable<IBook[]> = this.booksFacade.recentBooks$;
  recommendedBooks$: Observable<IBook[]> =
    this.recommendedBooksFacade.recommendedBooks$;
  subscription!: Subscription;

  constructor(
    private booksFacade: BooksFacade,
    private recommendedBooksFacade: RecommendedBooksFacade
  ) {}

  ngOnInit(): void {
    const searchValue = recommendedGenerator();
    console.log(searchValue);
    this.recommendedBooksFacade.fetchRecommendedBooks(searchValue);
  }
}

const testBookData = [
  {
    id: 'xiPaZKAq_mUC',
    title: 'Theory of Random Sets',
    isFavorite: false,
    authors: ['Ilya Molchanov'],
    publishedDate: '2005-11-28',
    images: {
      small:
        'http://books.google.com/books/content?id=xiPaZKAq_mUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      normal:
        'http://books.google.com/books/content?id=xiPaZKAq_mUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    categories: ['Mathematics'],
  },
  {
    id: '-ifxDwAAQBAJ',
    title: 'Random Summation',
    isFavorite: false,
    authors: ['Boris V. Gnedenko', 'Victor Yu. Korolev'],
    publishedDate: '2020-07-24',
    images: {
      small:
        'http://books.google.com/books/content?id=-ifxDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      normal:
        'http://books.google.com/books/content?id=-ifxDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    categories: ['Mathematics'],
  },
  {
    id: 'UDeFCwAAQBAJ',
    title: 'Branching Random Walks',
    isFavorite: false,
    authors: ['Zhan Shi'],
    publishedDate: '2016-02-04',
    images: {
      small:
        'http://books.google.com/books/content?id=UDeFCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      normal:
        'http://books.google.com/books/content?id=UDeFCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    categories: ['Mathematics'],
  },
  {
    id: 'kjRqDQAAQBAJ',
    title: 'Random Knotting and Linking',
    isFavorite: false,
    authors: ['Kenneth C. Millett'],
    publishedDate: '1994',
    images: {
      small:
        'http://books.google.com/books/content?id=kjRqDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      normal:
        'http://books.google.com/books/content?id=kjRqDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    categories: ['Mathematics'],
  },
  {
    id: 'vbcwDwAAQBAJ',
    title: 'Random Violence',
    isFavorite: false,
    authors: ['Joel Best'],
    publishedDate: '1999-03-02',
    images: {
      small:
        'http://books.google.com/books/content?id=vbcwDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      normal:
        'http://books.google.com/books/content?id=vbcwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    categories: ['Social Science'],
  },
];
