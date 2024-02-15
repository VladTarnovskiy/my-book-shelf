import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IBook } from '../../../shared/models/book.model';
import { Observable, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PreviewSkeletonComponent } from '../../components/preview-skeleton/preview-skeleton.component';
import { PreviewOptionsComponent } from '../../components/preview-options/preview-options.component';
import { BooksFacade } from '../../../store/books/books.facade';
import { DestroyDirective } from '../../../core/directives/destroy';

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
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  ratingItems = [...Array(5).keys()];
  book$: Observable<IBook | null> = this.booksFacade.previewBook$;
  isLoading$: Observable<boolean> = this.booksFacade.previewBookLoader$;
  @Input({ required: true }) bookData!: IBook;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private booksFacade: BooksFacade) {}

  searchAuthorBooks(author: string): void {
    this.booksFacade.fetchBooks(author, 'Author', 'Browse', 1);
  }

  ngOnInit(): void {
    this.booksFacade.previewBookId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookId) => {
        if (bookId) {
          this.booksFacade.fetchPreviewBook(bookId);
        }
      });
  }
}
