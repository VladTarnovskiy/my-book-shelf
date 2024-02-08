import { Component, Input } from '@angular/core';
import { IBook } from '../../../shared/models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-book.component.html',
  styleUrl: './home-book.component.scss',
})
export class HomeBookComponent {
  @Input({ required: true }) bookData!: IBook;
}
