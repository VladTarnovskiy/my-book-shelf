import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IBook } from '@shared/models/book';
import { mockBooksDataResponse } from '@shared/tests';

import { SearchService } from '.';

describe('SearchService', () => {
  let service: SearchService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})],
    });
    service = TestBed.inject(SearchService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get books', () => {
    const expectedUrl =
      'https://www.googleapis.com/books/v1/volumes?q=cat&startIndex=0';

    let booksData: IBook[] = [];
    service
      .getBooks({
        searchValue: 'cat',
        filterType: 'All',
        categoryFilterType: 'Browse',
        page: 0,
      })
      .subscribe((books) => {
        booksData = books.books;
      });

    const requestOne = controller.expectOne(expectedUrl);
    requestOne.flush(mockBooksDataResponse);
    expect(booksData.length).toBe(10);
    expect(booksData[0].title).toBe(
      'Kuisheid voor mannen, vrijheid voor vrouwen'
    );
  });

  it('should get book', () => {
    const expectedUrl =
      'https://www.googleapis.com/books/v1/volumes/R0ZJGpDR-JAC';

    let booksData!: IBook;
    service.getBook('R0ZJGpDR-JAC').subscribe((book) => {
      booksData = book;
    });

    const requestOne = controller.expectOne(expectedUrl);
    requestOne.flush(mockBooksDataResponse.items[0]);
    expect(booksData.title).toBe('Kuisheid voor mannen, vrijheid voor vrouwen');
  });

  it('get search value', () => {
    const expectedUrl =
      'https://www.googleapis.com/books/v1/volumes?q=cat&startIndex=0';

    let searchValues!: string[];
    service
      .getSearchData({
        searchValue: 'cat',
        filterType: 'All',
        categoryFilterType: 'Browse',
        page: 0,
      })
      .subscribe((values) => {
        searchValues = values;
      });

    const requestOne = controller.expectOne(expectedUrl);
    requestOne.flush(mockBooksDataResponse);
    expect(searchValues[0]).toBe(
      'Petra de Vries, Kuisheid voor mannen, vrijheid voor vrouwen'
    );
  });

  it('get recommended books', () => {
    const expectedUrl = 'https://www.googleapis.com/books/v1/volumes?q=cat';

    let booksData: IBook[] = [];
    service.getRecBooks('cat').subscribe((books) => {
      booksData = books;
    });

    const requestOne = controller.expectOne(expectedUrl);
    requestOne.flush(mockBooksDataResponse);
    expect(booksData.length).toBe(10);
    expect(booksData[0].title).toBe(
      'Kuisheid voor mannen, vrijheid voor vrouwen'
    );
  });
});
