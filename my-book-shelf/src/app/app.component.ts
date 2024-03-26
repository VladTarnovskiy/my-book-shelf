import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from '@components/core/toaster-container';
import { LoaderComponent } from '@components/shared/loader';
import { DestroyDirective } from '@core/directives';
import { AuthService } from '@core/services/auth';
import { ToasterService } from '@core/services/toaster';
import { UserService } from '@core/services/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IThemes } from '@shared/interfaces/theme';
import { AuthFacade } from '@store/auth';
import { catchError, map, of, takeUntil } from 'rxjs';

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
  hostDirectives: [DestroyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  userIsLoading$ = this.authFacade.userIsLoading$;
  private destroy$ = inject(DestroyDirective).destroy$;

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
      if (user !== null && user) {
        this.setUserName(user.uid);
      } else {
        this.authService.isLoggedIn.next(false);
        this.authFacade.changeUserIsLoading(false);
      }
    });
  }

  setUserName(userId: string): void {
    this.userService
      .getUser(userId)
      .pipe(
        takeUntil(this.destroy$),
        map((user) => user.payload.data()),
        catchError(() => {
          this.toasterService.showFireStoreError();
          return of();
        })
      )
      .subscribe((userInfo) => {
        if (userInfo) {
          this.authFacade.addUserName(userInfo.name);
          this.authFacade.addUserId(userInfo.userId);
          this.authFacade.addUserPhoto(userInfo.photo);
          this.authService.isLoggedIn.next(true);
        }
        this.authFacade.changeUserIsLoading(false);
      });
  }
}
