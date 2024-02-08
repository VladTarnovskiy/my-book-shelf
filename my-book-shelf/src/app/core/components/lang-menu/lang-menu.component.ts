import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lang-menu',
  standalone: true,
  imports: [],
  templateUrl: './lang-menu.component.html',
  styleUrl: './lang-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangMenuComponent {
  isMenu = false;

  onLangToggle() {
    this.isMenu = !this.isMenu;
  }

  onLangClose() {
    setTimeout(() => {
      this.isMenu = false;
    }, 300);
  }
}
