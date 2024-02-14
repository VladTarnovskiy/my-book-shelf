import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IBookResp, ISearchResp } from '../../../shared/interfaces/booksResp';
import {
  CategoryFilterKeys,
  FilterTypesKeys,
  filterCategoryTypes,
  filterTypes,
} from '../../../shared/interfaces/filters';
import { SetTotalsItems } from '../../../store/books/books.action';
import { Store } from '@ngrx/store';
import { IBook } from '../../../shared/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL = 'https://www.googleapis.com/books/v1/volumes';
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getBooks(
    searchValue: string,
    filterType: FilterTypesKeys,
    filterCategoryType: CategoryFilterKeys,
    page: number
  ): Observable<IBook[]> {
    const filterTypeValue = filterTypes[filterType];
    const filterCategoryValue = filterCategoryTypes[filterCategoryType];
    let checkedFilterTypeValue: string;
    let checkedCategoryFilterValue: string;
    let options: { params: HttpParams };

    //???????????????????

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
          .set('q', `${checkedFilterTypeValue}''${checkedCategoryFilterValue}`)
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
          this.store.dispatch(SetTotalsItems({ totalItems: resp.totalItems }));
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

  getBook(bookId: string): Observable<IBook> {
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

  getRecBooks(searchValue: string): Observable<IBook[]> {
    const options: { params: HttpParams } = {
      params: new HttpParams().set('q', `${searchValue}`),
    };

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

  handleError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return `An error occurred:', ${error.error}`;
    }
    return `Backend returned code ${error.status}, body was: , ${error.error} `;
  }
}
