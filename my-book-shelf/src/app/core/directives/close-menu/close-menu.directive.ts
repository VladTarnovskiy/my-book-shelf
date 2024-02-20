import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCloseMenu]',
  standalone: true,
})
export class CloseMenuDirective {
  @Output() closeMenu = new EventEmitter<boolean>(false);

  @HostListener('blur') onMouseEnter() {
    this.closeMenu.emit(false);
  }
}
