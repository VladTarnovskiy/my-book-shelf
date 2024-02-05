import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ISearchResp } from '../../interfaces/booksResp';
import { FilterCategoryKeys, FilterTypesKeys } from '../../interfaces/filters';

const filterTypes: Record<FilterTypesKeys, string> = {
  All: '',
  Title: 'intitle',
  Author: 'inauthor',
  Text: 'inpublisher',
  Subjects: 'subject',
};

const filterCategoryTypes: Record<FilterCategoryKeys, string> = {
  Browse: '',
  Engineering: 'Engineering',
  Medical: 'Medical',
  'Arts & Science': 'Arts & Science',
  Architecture: 'Architecture',
  Law: 'Law',
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  getBooks(
    searchValue: string,
    filterType: FilterTypesKeys,
    filterCategoryType: FilterCategoryKeys
  ) {
    const filterTypeValue = filterTypes[filterType];
    const filterCategoryValue = filterCategoryTypes[filterCategoryType];
    let checkedFilterTypeValue: string;
    let checkedCategoryFilterValue: string;
    let options: { params: HttpParams };

    if (filterTypeValue === '') {
      checkedFilterTypeValue = '';
    } else {
      checkedFilterTypeValue = `${filterTypeValue}:`;
    }

    if (filterCategoryValue === '') {
      checkedCategoryFilterValue = '';
    } else {
      checkedCategoryFilterValue = `+${filterCategoryValue}:`;
    }

    if (searchValue === '') {
      options = {
        params: new HttpParams().set('q', `${checkedFilterTypeValue}random`),
      };
    } else {
      options = {
        params: new HttpParams().set(
          'q',
          `${checkedFilterTypeValue}${searchValue}${checkedCategoryFilterValue}`
        ),
      };
    }

    return this.http
      .get<ISearchResp>(this.searchURL, options ? options : undefined)
      .pipe(
        map((resp) => {
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
        })
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return `An error occurred:', ${error.error}`;
    }
    return `Backend returned code ${error.status}, body was: , ${error.error} `;
  }
}
