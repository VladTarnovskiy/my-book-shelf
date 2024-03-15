import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuote } from '@shared/models/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesURL = 'https://dummyjson.com/quotes/random';

  constructor(private http: HttpClient) {}

  getTodayQuote(): Observable<IQuote> {
    const interceptorSkipHeader = new HttpHeaders({
      'X-Skip-Interceptor': '',
    });
    return this.http.get<IQuote>(this.quotesURL, {
      headers: interceptorSkipHeader,
    });
  }

  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return `An error occurred:', ${error.error}`;
    }
    return `Backend returned code ${error.status}, body was: , ${error.error} `;
  }
}
