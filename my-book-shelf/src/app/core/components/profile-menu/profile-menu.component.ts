import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  isMenu = false;

  onProfileToggle() {
    this.isMenu = !this.isMenu;
  }

  onProfileClose() {
    setTimeout(() => {
      this.isMenu = false;
    }, 300);
  }
}
