import { Component } from '@angular/core';
import { QuoteComponent } from '../../components/quote/quote.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
