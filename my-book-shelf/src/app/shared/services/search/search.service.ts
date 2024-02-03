import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ISearchResp } from '../../interfaces/booksResp';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL =
    'https://www.googleapis.com/books/v1/volumes?&projection=lite';
  constructor(private http: HttpClient) {}

  getBooks(searchValue: string) {
    const searchQuery = { params: new HttpParams().set('q', searchValue) };
    return this.http.get<ISearchResp>(this.searchURL, searchQuery).pipe(
      map((resp) => {
        const transData = resp.items.map((book) => {
          const transBook = {
            id: book.id,
            title: book.volumeInfo.title || '',
            authors: book.volumeInfo.authors || '',
            publishedDate: book.volumeInfo.publishedDate || '',
            images: {
              small: book.volumeInfo.imageLinks?.smallThumbnail || '',
              normal: book.volumeInfo.imageLinks?.thumbnail || '',
            },
          };
          return transBook;
        });
        return transData;
      }),
      tap((data) => console.log(data))
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return `An error occurred:', ${error.error}`;
    }
    return `Backend returned code ${error.status}, body was: , ${error.error} `;
  }
}
