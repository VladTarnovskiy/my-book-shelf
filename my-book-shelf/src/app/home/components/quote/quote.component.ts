import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { IQuote } from '../../../search/models/quote';
import { QuoteSkeletonComponent } from '../quote-skeleton/quote-skeleton.component';
import { DestroyDirective } from '../../../core/directives/destroy';
import { QuotesFacade } from '../../../store/quotes/quotes.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [QuoteSkeletonComponent, CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class QuoteComponent implements OnInit {
  quote!: null | IQuote;
  isLoading$: Observable<boolean> = this.quotesFacade.isLoading$;
  error$: Observable<string | null> = this.quotesFacade.error$;
  isActive = [true, false, false, false];
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(private quotesFacade: QuotesFacade) {}

  ngOnInit(): void {
    this.quotesFacade.fetchQuote();
    this.quotesFacade.quote$
      .pipe(takeUntil(this.destroy$))
      .subscribe((quote) => {
        this.quote = quote;
      });
  }

  setNewQuote(el: number): void {
    this.quotesFacade.fetchQuote();
    this.isActive = this.isActive.map((_, index) => {
      if (el === index) {
        return true;
      } else {
        return false;
      }
    });
  }
}
