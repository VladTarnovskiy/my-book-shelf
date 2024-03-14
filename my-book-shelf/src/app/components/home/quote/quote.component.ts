import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { IQuote } from '../../../shared/models/quote';
import { QuoteSkeletonComponent } from '../quote-skeleton/quote-skeleton.component';
import { DestroyDirective } from '../../../core/directives/destroy/destroy.directive';
import { QuotesFacade } from '../../../store/quotes/quotes.facade';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
