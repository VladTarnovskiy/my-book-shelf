import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { switchMenuAnimation } from '@shared/animation';
import { ILanguage } from '@shared/interfaces/language';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lang-menu',
  standalone: true,
  imports: [TranslateModule, AsyncPipe, NgClass],
  templateUrl: './lang-menu.component.html',
  styleUrl: './lang-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [switchMenuAnimation],
})
export class LangMenuComponent implements OnInit {
  isMenu = false;
  activeLang = new BehaviorSubject<string>('en');

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.activeLang.next(lang);
    }
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLang.next(event.lang);
    });
  }

  onLangToggle(): void {
    this.isMenu = !this.isMenu;
  }

  onLangClose(): void {
    this.isMenu = false;
  }

  useLanguage(language: ILanguage): void {
    localStorage.setItem('lang', language);
    this.translate.use(language);
  }
}
