import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBooksSearchParams } from '@shared/interfaces/bookParams';
import { IBookResp, ISearchResp } from '@shared/interfaces/booksResp';
import { IBook } from '@shared/models/book';
import {
  getBooksSearchHeaders,
  transformRespBookData,
  transformRespBooksData,
} from '@shared/utils';
import { SetTotalsItems } from '@store/books/books.action';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL = 'https://www.googleapis.com/books/v1/volumes';
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getBooks({
    searchValue,
    filterType,
    categoryFilterType,
    page,
  }: IBooksSearchParams): Observable<IBook[]> {
    const options = getBooksSearchHeaders({
      searchValue,
      filterType,
      categoryFilterType,
      page,
    });

    return this.http.get<ISearchResp>(this.searchURL, options).pipe(
      map((resp) => {
        this.store.dispatch(SetTotalsItems({ totalItems: resp.totalItems }));
        const transData = transformRespBooksData(resp);
        return transData;
      })
    );
  }

  getBook(bookId: string): Observable<IBook> {
    return this.http.get<IBookResp>(`${this.searchURL}/${bookId}`).pipe(
      map((book) => {
        const transBook = transformRespBookData(book);
        return transBook;
      })
    );
  }

  getSearchData({
    searchValue,
    filterType,
    categoryFilterType,
    page,
  }: IBooksSearchParams): Observable<string[]> {
    const options = getBooksSearchHeaders({
      searchValue,
      filterType,
      categoryFilterType,
      page,
    });

    return this.http.get<ISearchResp>(this.searchURL, options).pipe(
      map((resp) => {
        if (resp.items) {
          const data = resp.items.map(
            (book) =>
              `${(book.volumeInfo.authors && book.volumeInfo.authors[0]) || 'unknown'}, ${book.volumeInfo.title || 'unknown'}`
          );
          return data;
        } else {
          return [];
        }
      })
    );
  }

  getRecBooks(searchValue: string): Observable<IBook[]> {
    const options: { params: HttpParams } = {
      params: new HttpParams().set('q', `${searchValue}`),
    };

    return this.http.get<ISearchResp>(this.searchURL, options).pipe(
      map((resp) => {
        const transData = transformRespBooksData(resp);
        return transData;
      })
    );
  }

  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return `An error occurred:', ${error.error}`;
    }
    return `Backend returned code ${error.status}, body was: , ${error.error} `;
  }
}
