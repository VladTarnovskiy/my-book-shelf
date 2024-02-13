import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectRecentBooks } from '../../../store/books/books.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { CommonModule } from '@angular/common';
import { HomeBookComponent } from '../../components/home-book/home-book.component';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule, HomeBookComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentComponent {
  recentBooks$: Observable<IBook[]> = this.store.select(selectRecentBooks);
  constructor(private store: Store) {}
}
