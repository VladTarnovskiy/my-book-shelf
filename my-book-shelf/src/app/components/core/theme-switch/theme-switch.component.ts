import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  theme$ = new BehaviorSubject<string>('light');

  ngOnInit(): void {
    const themeData = localStorage.getItem('theme');
    if (themeData) {
      const theme = JSON.parse(themeData);
      if (theme === 'dark') {
        this.theme$.next('dark');
      } else {
        this.theme$.next('light');
      }
    }
  }

  changeTheme(): void {
    const bodyElement = document.body;
    bodyElement.setAttribute(
      'data-theme',
      this.theme$.getValue() === 'dark' ? 'light' : 'dark'
    );
    if (this.theme$.getValue() === 'light') {
      this.theme$.next('dark');
      localStorage.setItem('theme', JSON.stringify('dark'));
    } else {
      this.theme$.next('light');
      localStorage.setItem('theme', JSON.stringify('light'));
    }
  }
}
