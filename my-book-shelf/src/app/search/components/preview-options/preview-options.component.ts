import { ChangeDetectionStrategy, Component } from '@angular/core';
import { optionsList } from './preview-options.constant';

@Component({
  selector: 'app-preview-options',
  standalone: true,
  imports: [],
  templateUrl: './preview-options.component.html',
  styleUrl: './preview-options.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewOptionsComponent {
  optionsList = optionsList;
}
