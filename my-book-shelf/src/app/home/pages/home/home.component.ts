import { Component, OnInit } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import {
  selectBooks,
  selectLoading,
} from '../../../store/books/selectors/books.selector';
import { CommonModule } from '@angular/common';
import { FetchBooks } from '../../../store/books/actions/books.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent, HomeBookComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  books$: Observable<IBook[] | null> = this.store.select(selectBooks);
  isLoading$: Observable<boolean> = this.store.select(selectLoading);
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(FetchBooks({ searchValue: 'flowers+inauthor:keyes' }));
  }
}
