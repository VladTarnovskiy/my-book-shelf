import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-menu',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './lang-menu.component.html',
  styleUrl: './lang-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangMenuComponent {
  isMenu = false;

  constructor(private translate: TranslateService) {}

  onLangToggle(): void {
    this.isMenu = !this.isMenu;
  }

  onLangClose(): void {
    this.isMenu = false;
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
