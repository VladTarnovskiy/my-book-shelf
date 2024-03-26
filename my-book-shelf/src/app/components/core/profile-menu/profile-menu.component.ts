import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMenuAnimation } from '@shared/animation';
import { IUserData } from '@shared/models/user';
import { AuthFacade } from '@store/auth';
import { Observable } from 'rxjs';

import { profileList } from './profile-menu.constant';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [RouterLink, AsyncPipe, TranslateModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [switchMenuAnimation],
})
export class ProfileMenuComponent {
  navigationList = profileList;
  isMenu = false;
  userData$: Observable<IUserData> = this.authFacade.userData$;

  constructor(private authFacade: AuthFacade) {}

  onProfileToggle(): void {
    this.isMenu = !this.isMenu;
  }

  onProfileClose(): void {
    this.isMenu = false;
  }
}
