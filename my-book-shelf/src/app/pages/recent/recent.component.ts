import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HomeBookComponent } from '@components/home/home-book';
import { DestroyDirective } from '@core/directives/destroy';
import { RecentService } from '@core/services/recent';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [AsyncPipe, HomeBookComponent, TranslateModule],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class RecentComponent implements OnInit {
  recentBooks$ = new BehaviorSubject<IBook[] | null>(null);
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private recentService: RecentService) {}

  ngOnInit(): void {
    this.recentService
      .getRecentBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        const booksData = books.map((book) => book.payload.doc.data());
        this.recentBooks$.next(booksData);
      });
  }
}
