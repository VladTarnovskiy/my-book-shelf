import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesService } from '../../../search/services/quotes/quotes.service';
import { Subscription } from 'rxjs';
import { IQuote } from '../../../search/models/quote';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  quote!: IQuote | null;

  constructor(private quotesService: QuotesService) {}

  ngOnInit() {
    this.subscription = this.quotesService
      .getTodayQuote()
      .subscribe((quote) => {
        this.quote = quote;
        console.log(quote);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
