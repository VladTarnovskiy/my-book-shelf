import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-book-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './home-book-skeleton.component.html',
  styleUrl: './home-book-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBookSkeletonComponent {}
