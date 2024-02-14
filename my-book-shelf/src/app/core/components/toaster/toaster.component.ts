import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toaster } from '../../models/toaster';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  @Input() toast!: Toaster;
  @Input() i!: number;

  @Output() remove = new EventEmitter<number>();

  onClose(): void {
    this.remove.emit(this.i);
  }
}
