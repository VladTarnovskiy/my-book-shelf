import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-book-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './search-book-skeleton.component.html',
  styleUrl: './search-book-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBookSkeletonComponent {}
