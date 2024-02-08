import { selectPreviewBookLoader } from './../../../store/books/selectors/books.selector';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IBook } from '../../../shared/models/book.model';
import { Store } from '@ngrx/store';
import {
  selectBookId,
  selectPreviewBook,
} from '../../../store/books/selectors/books.selector';
import {
  FetchPreviewBook,
  FetchBooks,
} from '../../../store/books/actions/books.action';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PreviewSkeletonComponent } from '../../components/preview-skeleton/preview-skeleton.component';
import { PreviewOptionsComponent } from '../../components/preview-options/preview-options.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    PreviewSkeletonComponent,
    PreviewOptionsComponent,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit, OnDestroy {
  ratingItems = [...Array(5).keys()];
  book$: Observable<IBook | null> = this.store.select(selectPreviewBook);
  isLoading$: Observable<boolean> = this.store.select(selectPreviewBookLoader);
  @Input({ required: true }) bookData!: IBook;
  subscription!: Subscription;

  constructor(private store: Store) {}

  searchAuthorBooks(author: string) {
    this.store.dispatch(
      FetchBooks({
        searchValue: author,
        filterType: 'Author',
        categoryFilterType: 'Browse',
        page: 1,
      })
    );
  }

  ngOnInit() {
    this.subscription = this.store.select(selectBookId).subscribe((bookId) => {
      if (bookId) {
        this.store.dispatch(FetchPreviewBook({ bookId }));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
