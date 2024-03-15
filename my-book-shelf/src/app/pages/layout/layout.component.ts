import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/core/footer';
import { LangMenuComponent } from '@components/core/lang-menu';
import { NavigationComponent } from '@components/core/navigation';
import { ProfileMenuComponent } from '@components/core/profile-menu';
import { SearchBarComponent } from '@components/core/search-bar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    FooterComponent,
    SearchBarComponent,
    LangMenuComponent,
    ProfileMenuComponent,
    NgClass,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  isActiveHamburger = false;

  toggleHamburger(): void {
    this.isActiveHamburger = !this.isActiveHamburger;
  }
}
