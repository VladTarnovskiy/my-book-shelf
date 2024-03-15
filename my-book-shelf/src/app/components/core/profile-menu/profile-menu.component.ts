import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMenuAnimation } from '@shared/animation';
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
