import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IBooksInfoData,
  IBooksSearchParams,
} from '@shared/interfaces/bookParams';
import { IBookResp, ISearchResp } from '@shared/interfaces/booksResp';
import { IBook } from '@shared/models/book';
import {
  getBooksSearchHeaders,
  transformRespBookDat
  transformRespBooksData,
} from '@shared/utils';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  getBooks({
    searchValue,
    filterType,
    categoryFilterType,
    page,
  }: IBooksSearchParams): Observable<IBooksInfoData> {
    const options = getBooksSearchHeaders({
      searchValue,
      filterType,
      categoryFilterType,
      page,
    });

    return this.http.get<ISearchResp>(this.searchURL, options).pipe(
      map((resp) => {
        this.getBookX().then((x) => x.subscribe());
        const transData = transformRespBooksData(resp);
        return { books: transData, totalBooks: resp.totalItems };
      })
    );
  }

  async hash(string: string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  // hash(string: string) {
  // let hash = 0;

  // if (string.length == 0) return hash;

  // for (let i = 0; i < string.length; i++) {
  //   const char = string.charCodeAt(i);
  //   hash = (hash << 5) - hash + char;
  //   hash = hash & hash;
  // }

  // return hash;

  //   const hashPwd = crypto.createHash('sha1').update(string).digest('hex');

  //   return hashPwd;
  // }

  async getBookX() {
    const x = await this.hash(
      `355fc37475c71f6e37536c2867773eb0eb4300bb5f${Math.floor(Date.now() / 1000)}`
    );
    console.log(x);
    return this.http
      .post('https://api.hotelbeds.com/hotel-api/1.0/status', {
        headers: {
          Accept: 'application/json',
          'Api-key': '355fc37475c71f6e37536c2867773eb0',
          'X-Signature': String(x),
          'X-Skip-Interceptor': '',
          'Accept-Encoding': 'gzip',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((resp) => {
          console.log(resp);
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
        if (resp.items) {
          const transData = transformRespBooksData(resp);
          return transData;
        } else {
          return [];
        }
      })
    );
  }
}
