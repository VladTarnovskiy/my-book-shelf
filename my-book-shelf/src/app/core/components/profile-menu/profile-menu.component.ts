import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const navigationList = [
  { link: '/', title: 'Profile' },
  { link: '/favorite', title: 'Favorite' },
  {
    link: '/',
    title: 'My Books',
  },
  { link: '/auth/login', title: 'Logout' },
];

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  navigationList = navigationList;
  isMenu = false;

  onProfileToggle(): void {
    this.isMenu = !this.isMenu;
  }

  onProfileClose(): void {
    setTimeout(() => {
      this.isMenu = false;
    }, 300);
  }
}
