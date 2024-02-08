import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preview-options',
  standalone: true,
  imports: [],
  templateUrl: './preview-options.component.html',
  styleUrl: './preview-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewOptionsComponent {}
