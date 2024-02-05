import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import {
  selectBooks,
  selectLoading,
  selectSearchValue,
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
export class HomeComponent implements OnInit, OnDestroy {
  books$: Observable<IBook[] | null> = this.store.select(selectBooks);
  isLoading$: Observable<boolean> = this.store.select(selectLoading);
  searchValue$: Observable<string> = this.store.select(selectSearchValue);
  subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    // this.subscription = this.searchValue$.subscribe((searchValue) => {
    //   this.store.dispatch(FetchBooks({ searchValue }));
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
