import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitchComponent {
  theme$ = new BehaviorSubject<string>('white');

  changeTheme() {
    const bodyElement = document.body;
    if (this.theme$.getValue() === 'white') {
      this.theme$.next('dark');
      localStorage.setItem('theme', JSON.stringify('dark'));
      bodyElement.classList.add('dark');
      bodyElement.classList.remove('light');
    } else {
      this.theme$.next('white');
      localStorage.setItem('theme', JSON.stringify('white'));
      bodyElement.classList.add('light');
      bodyElement.classList.remove('dark');
    }
  }
}
