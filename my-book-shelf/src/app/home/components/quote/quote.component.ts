import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { QuotesService } from '../../../core/services/quotes/quotes.service';
import { takeUntil } from 'rxjs';
import { IQuote } from '../../../search/models/quote';
import { QuoteSkeletonComponent } from '../quote-skeleton/quote-skeleton.component';
import { DestroyDirective } from '../../../core/directives/destroy';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [QuoteSkeletonComponent],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class QuoteComponent implements OnInit {
  quote!: IQuote | null;
  isLoading = false;
  isError = false;
  isActive = [true, false, false, false];
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private quotesService: QuotesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote(): void {
    this.isLoading = true;
    this.quotesService
      .getTodayQuote()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (quote) => {
          this.quote = quote;
          this.isLoading = false;
          this.isError = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.isError = true;
          this.cd.detectChanges();
        },
      });
  }

  setNewQuote(el: number): void {
    this.getQuote();
    this.isActive = this.isActive.map((_, index) => {
      if (el === index) {
        return true;
      } else {
        return false;
      }
    });
  }
}
