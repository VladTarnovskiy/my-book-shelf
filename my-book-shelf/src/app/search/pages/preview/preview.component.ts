import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IBook } from '../../../shared/models/book.model';
import { Store } from '@ngrx/store';
import {
  selectBookId,
  selectPreviewBook,
} from '../../../store/books/selectors/books.selector';
import {
  FetchBook,
  FetchBooks,
} from '../../../store/books/actions/books.action';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit, OnDestroy {
  ratingItems = [...Array(5).keys()];
  book$: Observable<IBook | null> = this.store.select(selectPreviewBook);
  @Input({ required: true }) bookData!: IBook;
  subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription = this.store.select(selectBookId).subscribe((bookId) => {
      this.store.dispatch(FetchBook({ bookId }));
    });
  }

  searchAuthorBooks(author: string) {
    this.store.dispatch(
      FetchBooks({
        searchValue: author,
        filterType: 'Author',
        categoryFilterType: 'Browse',
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
