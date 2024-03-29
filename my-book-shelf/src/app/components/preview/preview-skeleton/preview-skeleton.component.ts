import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preview-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './preview-skeleton.component.html',
  styleUrl: './preview-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewSkeletonComponent {}
