import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DestroyDirective } from '@core/directives/destroy';
import { TranslateModule } from '@ngx-translate/core';
import { IQuote } from '@shared/models/quote';
import { QuotesFacade } from '@store/quotes';
import { Observable, takeUntil } from 'rxjs';

import { QuoteSkeletonComponent } from '../quote-skeleton';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [QuoteSkeletonComponent, AsyncPipe, TranslateModule],
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
