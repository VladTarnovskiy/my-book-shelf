import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Toaster } from '../../../shared/models/toaster';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent {
  @Input() toast!: Toaster;
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();

  onClose(): void {
    this.remove.emit(this.index);
  }
}
