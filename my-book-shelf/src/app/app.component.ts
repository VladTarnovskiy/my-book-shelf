import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from '@components/core/toaster-container';
import { LoaderComponent } from '@components/shared/loader';
import { AuthService } from '@core/services/auth';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthFacade } from '@store/auth';

import englishLang from '../assets/i18n/en.json';
import russianLang from '../assets/i18n/ru.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToasterContainerComponent,
    TranslateModule,
    AsyncPipe,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userIsLoading$ = this.authFacade.userIsLoading$;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private authFacade: AuthFacade
  ) {
    translate.setTranslation('en', englishLang);
    translate.setTranslation('ru', russianLang);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.authService.getUserAfterReload();
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }
    // alert(
    //   'The Google books API is not available in Belarus, please, use a VPN to make the service work correctly!'
    // );
  }
}
