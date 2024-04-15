import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IThemes } from '@shared/interfaces/theme';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitchComponent implements OnInit {
  theme$ = new BehaviorSubject<string>(IThemes.Dark);

  ngOnInit(): void {
    const themeData = localStorage.getItem('theme');
    if (themeData) {
      const theme = JSON.parse(themeData);
      if (theme === IThemes.Dark) {
        this.theme$.next(IThemes.Dark);
      } else {
        this.theme$.next(IThemes.Light);
      }
    }
  }

  changeTheme(): void {
    const bodyElement = document.body;
    bodyElement.setAttribute(
      'data-theme',
      this.theme$.getValue() === IThemes.Dark ? IThemes.Light : IThemes.Dark
    );
    if (this.theme$.getValue() === IThemes.Light) {
      this.theme$.next(IThemes.Dark);
      localStorage.setItem('theme', JSON.stringify(IThemes.Dark));
    } else {
      this.theme$.next(IThemes.Light);
      localStorage.setItem('theme', JSON.stringify(IThemes.Light));
    }
  }
}
