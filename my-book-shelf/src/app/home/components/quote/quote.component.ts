import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { QuotesService } from '../../../core/services/quotes/quotes.service';
import { Subscription } from 'rxjs';
import { IQuote } from '../../../search/models/quote';
import { QuoteSkeletonComponent } from '../quote-skeleton/quote-skeleton.component';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [QuoteSkeletonComponent],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  quote!: IQuote | null;
  isLoading = false;
  isError = false;
  isActive = [true, false, false, false];

  constructor(
    private quotesService: QuotesService,
    private cd: ChangeDetectorRef
  ) {}

  getQuote() {
    this.isLoading = true;
    this.subscription = this.quotesService.getTodayQuote().subscribe({
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

  setNewQuote(el: number) {
    this.getQuote();
    this.isActive = this.isActive.map((_, index) => {
      if (el === index) {
        return true;
      } else {
        return false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getQuote();
  }
}
