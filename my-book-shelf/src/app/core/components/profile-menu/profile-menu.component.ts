import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { profileList } from './profile-menu.constant';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  navigationList = profileList;
  isMenu = false;
  userName$: Observable<string> = this.authFacade.userName$;
  photo$: Observable<string | null> = this.authFacade.userPhoto$;

  constructor(private authFacade: AuthFacade) {}

  onProfileToggle(): void {
    this.isMenu = !this.isMenu;
  }

  onProfileClose(): void {
    this.isMenu = false;
  }
}
