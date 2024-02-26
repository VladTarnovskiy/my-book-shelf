import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from './core/components/toaster-container/toaster-container.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import englishLang from '../assets/i18n/en.json';
import russianLang from '../assets/i18n/ru.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToasterContainerComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', englishLang);
    translate.setTranslation('ru', russianLang);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // alert(
    //   'The Google books API is not available in Belarus, please, use a VPN to make the service work correctly!'
    // );
  }
}
