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
  isActive = [true, false, false, false];

  constructor(private quotesService: QuotesService) {}

  getQuote() {
    this.subscription = this.quotesService
      .getTodayQuote()
      .subscribe((quote) => {
        this.quote = quote;
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
