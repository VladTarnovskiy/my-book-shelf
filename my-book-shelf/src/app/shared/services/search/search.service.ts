import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ISearchResp } from '../../interfaces/booksResp';
import { FilterTypesKeys } from '../../interfaces/filters';

const filterTypes: Record<FilterTypesKeys, string> = {
  All: '',
  Title: 'intitle',
  Author: 'inauthor',
  Text: 'inpublisher',
  Subjects: 'subject',
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  getBooks(searchValue: string, filterType: FilterTypesKeys) {
    const filterTypeValue = filterTypes[filterType];
    let checkedFilterTypeValue: string;
    let options: { params: HttpParams };

    if (filterTypeValue === '') {
      checkedFilterTypeValue = '';
    } else {
      checkedFilterTypeValue = `${filterTypeValue}:`;
    }

    if (searchValue === '') {
      options = {
        params: new HttpParams().set('q', `${checkedFilterTypeValue}random`),
      };
    } else {
      options = {
        params: new HttpParams().set(
          'q',
          `${checkedFilterTypeValue}${searchValue}`
        ),
      };
    }

    return this.http
      .get<ISearchResp>(this.searchURL, options ? options : undefined)
      .pipe(
        map((resp) => {
          console.log(resp);
          const transData = resp.items.map((book) => {
            const transBook = {
              id: book.id,
              title: book.volumeInfo.title || '',
              authors: book.volumeInfo.authors || ['unknown'],
              publishedDate: book.volumeInfo.publishedDate || '',
              images: {
                small:
                  book.volumeInfo.imageLinks?.smallThumbnail ||
                  'assets/logo.svg',
                normal:
                  book.volumeInfo.imageLinks?.thumbnail || 'assets/logo.svg',
              },
              categories: book.volumeInfo?.categories || ['unknown'],
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
