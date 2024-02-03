import { Component, Input } from '@angular/core';
import { IBook } from '../../../shared/models/book.model';

@Component({
  selector: 'app-home-book',
  standalone: true,
  imports: [],
  templateUrl: './home-book.component.html',
  styleUrl: './home-book.component.scss',
})
export class HomeBookComponent {
  @Input({ required: true }) bookData!: IBook;
}
