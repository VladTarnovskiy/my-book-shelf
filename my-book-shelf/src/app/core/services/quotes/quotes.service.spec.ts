import { TestBed } from '@angular/core/testing';

import { QuotesService } from './quotes.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IQuote } from '../../../search/models/quote';

describe('QuotesService', () => {
  let service: QuotesService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(QuotesService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get quote', () => {
    const expectedUrl = 'https://dummyjson.com/quotes/random';

    const quoteMockResponse = { id: 2342, quote: 'Cat', author: 'John' };

    let quote!: IQuote;
    service.getTodayQuote().subscribe((quoteData) => {
      quote = quoteData;
    });

    const requestOne = controller.expectOne(expectedUrl);
    requestOne.flush(quoteMockResponse);
    expect(quote).toEqual(quoteMockResponse);
  });
});
