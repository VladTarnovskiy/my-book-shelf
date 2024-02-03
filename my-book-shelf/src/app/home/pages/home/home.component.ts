import { Component, OnInit } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { SearchService } from '../../../shared/services/search/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent, HomeBookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getBooks('flowers+inauthor:keyes').subscribe((books) => {
      console.log(books);
    });
  }
}
