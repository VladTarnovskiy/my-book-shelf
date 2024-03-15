import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeBookComponent } from '@components/home/home-book';
import { TranslateModule } from '@ngx-translate/core';
import { IBook } from '@shared/models/book';
import { RecommendedBooksFacade } from '@store/recommendedBooks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [HomeBookComponent, AsyncPipe, TranslateModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedComponent {
  recBooks$: Observable<IBook[]> = this.recBooksFacade.recommendedBooks$;
  constructor(private recBooksFacade: RecommendedBooksFacade) {}
}
