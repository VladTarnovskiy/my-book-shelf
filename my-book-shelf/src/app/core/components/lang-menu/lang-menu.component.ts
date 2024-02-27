import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

@Component({
  selector: 'app-lang-menu',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './lang-menu.component.html',
  styleUrl: './lang-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangMenuComponent implements OnInit {
  isMenu = false;
  activeLang = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLang = event.lang;
    });
  }

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
