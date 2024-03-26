import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGoBack]',
  standalone: true,
})
export class GoBackDirective {
  constructor(private location: Location) {}

  @HostListener('click') onMouseEnter() {
    this.location.back();
  }
}
