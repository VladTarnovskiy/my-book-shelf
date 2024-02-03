import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ISearchResp } from '../../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchURL =
    'https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite';
  constructor(private http: HttpClient) {}

  getBooks(searchValue: string) {
    // const searchQuery = { params: new HttpParams().set('q', searchValue) };
    // if (pageToken) {
    //   searchQuery = {
    //     params: new HttpParams()
    //       .set('q', searchValue)
    //       .set('pageToken', pageToken),
    //   };
    // }
    return this.http
      .get<ISearchResp>(this.searchURL)
      .pipe
      // tap((books) => {
      //   console.log(JSON.parse(books));
      // })
      ();
    // tap((cardsInfo) =>
    //   this.store.dispatch(
    //     CardsActions.SetPagesInfo({
    //       pagesInfo: {
    //         nextPage: cardsInfo.nextPageToken,
    //         prevPage: cardsInfo.prevPageToken,
    //         searchValue,
    //       },
    //     })
    //   )
    // ),
    // map((booksInfo) => {
    // let ids = '';
    // booksInfo.items.forEach((item) => {
    //   ids += `${item.id.videoId},`;
    // });
    // const options = {
    //   params: new HttpParams().set('id', ids.slice(0, -1)),
    // };
    // return options;
    // })
    // ();
  }
}
