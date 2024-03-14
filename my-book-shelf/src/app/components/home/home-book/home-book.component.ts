import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IBook } from '../../../shared/models/book.model';

@Component({
  selector: 'app-home-book',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './home-book.component.html',
  styleUrl: './home-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBookComponent {
  @Input({ required: true }) bookData!: IBook;
}
