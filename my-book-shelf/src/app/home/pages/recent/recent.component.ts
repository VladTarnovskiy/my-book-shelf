import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { AsyncPipe } from '@angular/common';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecentService } from '../../../core/services/recent/recent.service';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';

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
