import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../components/core/navigation/navigation.component';
import { FooterComponent } from '../../components/core/footer/footer.component';
import { SearchBarComponent } from '../../components/core/search-bar/search-bar.component';
import { LangMenuComponent } from '../../components/core/lang-menu/lang-menu.component';
import { ProfileMenuComponent } from '../../components/core/profile-menu/profile-menu.component';
import { NgClass } from '@angular/common';

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
