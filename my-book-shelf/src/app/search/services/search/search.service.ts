import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBookResp, ISearchResp } from '../../../shared/interfaces/booksResp';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
} from '../../../shared/interfaces/filters';

const filterTypes: Record<FilterTypesKeys, string> = {
  All: '',
  Title: 'intitle',
  Author: 'inauthor',
  Text: 'inpublisher',
  Subjects: 'subject',
};

const filterCategoryTypes: Record<CategoryFilterKeys, string> = {
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
    filterCategoryType: CategoryFilterKeys,
    page: number
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
        params: new HttpParams()
          .set(
            'q',
            `${checkedFilterTypeValue}random${checkedCategoryFilterValue}`
          )
          .append('startIndex', `${page * 10}`),
      };
    } else {
      options = {
        params: new HttpParams()
          .set(
            'q',
            `${checkedFilterTypeValue}${searchValue}${checkedCategoryFilterValue}`
          )
          .append('startIndex', `${page * 10}`),
      };
    }

    return this.http
      .get<ISearchResp>(this.searchURL, options ? options : undefined)
      .pipe(
        map((resp) => {
          const transData = resp.items.map((book) => {
            const transBook = {
              id: book.id,
              isFavorite: false,
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

  getBook(bookId: string) {
    return this.http.get<IBookResp>(`${this.searchURL}/${bookId}`).pipe(
      map((book) => {
        const transBook = {
          id: book.id,
          isFavorite: false,
          title: book.volumeInfo.title || '',
          authors: book.volumeInfo.authors || ['unknown'],
          publishedDate: book.volumeInfo.publishedDate || '',
          images: {
            small:
              book.volumeInfo.imageLinks?.smallThumbnail || 'assets/logo.svg',
            normal: book.volumeInfo.imageLinks?.thumbnail || 'assets/logo.svg',
          },
          categories: book.volumeInfo?.categories || ['unknown'],
        };
        return transBook;
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
