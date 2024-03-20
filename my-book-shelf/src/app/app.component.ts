import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from '@components/core/toaster-container';
import { LoaderComponent } from '@components/shared/loader';
import { AuthService } from '@core/services/auth';
import { ToasterService } from '@core/services/toaster';
import { UserService } from '@core/services/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IThemes } from '@shared/interfaces/theme';
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
    private authFacade: AuthFacade,
    private auth: Auth,
    private userService: UserService,
    private toasterService: ToasterService
  ) {
    translate.setTranslation('en', englishLang);
    translate.setTranslation('ru', russianLang);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.getUserAfterReload();
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }

    const themeData = localStorage.getItem('theme');
    const bodyElement = document.body;
    if (themeData) {
      const theme = JSON.parse(themeData);
      if (theme === IThemes.Dark) {
        bodyElement.setAttribute('data-theme', IThemes.Dark);
      } else {
        bodyElement.setAttribute('data-theme', IThemes.Light);
      }
    } else {
      bodyElement.setAttribute('data-theme', IThemes.Light);
    }

    // alert(
    //   'The Google books API is not available in Belarus, please, use a VPN to make the service work correctly!'
    // );
  }

  getUserAfterReload(): void {
    this.authFacade.changeUserIsLoading(true);
    this.auth.onAuthStateChanged((user) => {
      if (user !== null && user.emailVerified) {
        this.setUserName(user.uid);
      } else {
        this.authService.isLoggedIn.next(false);
        this.authFacade.changeUserIsLoading(false);
      }
    });
  }

  setUserName(userId: string): void {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        const userInfo = user.payload.data();
        if (userInfo) {
          this.authFacade.addUserName(userInfo.name);
          this.authFacade.addUserId(userInfo.userId);
          this.authFacade.addUserPhoto(userInfo.photo);
          this.authService.isLoggedIn.next(true);
        }
        this.authFacade.changeUserIsLoading(false);
      },
      error: () => {
        this.toasterService.showFireStoreError();
      },
    });
  }
}
