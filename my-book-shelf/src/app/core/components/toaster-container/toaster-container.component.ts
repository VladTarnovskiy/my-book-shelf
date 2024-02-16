import { Component, OnInit } from '@angular/core';
import { Toaster } from '../../models/toaster';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToasterService } from '../../services/toaster/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster-container',
  standalone: true,
  imports: [ToasterComponent, CommonModule],
  templateUrl: './toaster-container.component.html',
  styleUrl: './toaster-container.component.scss',
})
export class ToasterContainerComponent implements OnInit {
  toasts: Toaster[] = [];

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.toasterService.toast$.subscribe((toast) => {
      this.toasts = [...this.toasts, toast];
      setTimeout(() => this.toasts.pop(), 4000);
    });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((_, i) => i !== index);
  }
}
