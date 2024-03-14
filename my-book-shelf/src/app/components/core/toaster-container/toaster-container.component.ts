import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Toaster } from '../../../shared/models/toaster';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToasterService } from '../../../core/services/toaster/toaster.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toaster-container',
  standalone: true,
  imports: [ToasterComponent, AsyncPipe],
  templateUrl: './toaster-container.component.html',
  styleUrl: './toaster-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterContainerComponent implements OnInit {
  toasts = new BehaviorSubject<Toaster[]>([]);

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toast$.subscribe((toast) => {
      this.toasts.next([...this.toasts.getValue(), toast]);
      setTimeout(
        () => this.toasts.next([...this.toasts.getValue()].slice(1)),
        4000
      );
    });
  }

  remove(index: number): void {
    this.toasts.next([...this.toasts.getValue()].filter((_, i) => i !== index));
  }
}
