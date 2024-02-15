import { ChangeDetectionStrategy, Component } from '@angular/core';

const optionsList = [
  { src: 'assets/details/review.svg', title: 'Review' },
  { src: 'assets/details/notes.svg', title: 'Notes' },
  { src: 'assets/details/share.svg', title: 'Share' },
];

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
