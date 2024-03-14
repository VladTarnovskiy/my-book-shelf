import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quote-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './quote-skeleton.component.html',
  styleUrl: './quote-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSkeletonComponent {}
