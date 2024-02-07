import { Injectable } from '@angular/core';
import { IQuote } from '../../models/quote';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesURL = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getTodayQuote() {
    const interceptorSkipHeader = new HttpHeaders({
      'X-Skip-Interceptor': '',
    });
    return this.http.get<IQuote>(this.quotesURL, {
      headers: interceptorSkipHeader,
    });
  }
}
