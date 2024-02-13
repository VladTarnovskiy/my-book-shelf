import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBook } from '../../../shared/models/book.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-book.component.html',
  styleUrl: './home-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBookComponent {
  @Input({ required: true }) bookData!: IBook;
}
