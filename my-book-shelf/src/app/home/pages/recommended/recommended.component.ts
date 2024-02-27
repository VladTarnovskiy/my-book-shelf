import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../../../shared/models/book.model';
import { RecommendedBooksFacade } from '../../../store/recommendedBooks/recommendedBooks.facade';
import { HomeBookComponent } from '../../components/home-book/home-book.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [HomeBookComponent, CommonModule, TranslateModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss',
})
export class RecommendedComponent {
  recBooks$: Observable<IBook[]> = this.recBooksFacade.recommendedBooks$;
  constructor(private recBooksFacade: RecommendedBooksFacade) {}
}
