import { Injectable } from '@angular/core';
import { IQuote } from '../../models/quote';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesURL = 'https://zenquotes.io/api/today';

  constructor(private http: HttpClient) {}

  getTodayQuote() {
    const interceptorSkipHeader = new HttpHeaders({
      'X-Skip-Interceptor': '',
    }).append('Access-Control-Allow-Origin', 'http://localhost:4200/');
    return this.http
      .get<IQuote[]>(this.quotesURL, { headers: interceptorSkipHeader })
      .pipe(
        map((quotes) => {
          return quotes[0];
        })
      );
  }
}
