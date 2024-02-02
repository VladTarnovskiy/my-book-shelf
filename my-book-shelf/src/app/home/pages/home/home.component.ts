import { Component } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';
import { HomeBookComponent } from '../../components/home-book/home-book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent, HomeBookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
