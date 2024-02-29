import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  userName = '';
  file: File | null = null;
  userName$: Observable<string> = this.authFacade.userName$;

  constructor(
    private userService: UserService,
    private authFacade: AuthFacade
  ) {}

  changeUserName(): void {
    this.userService.changeUsername(this.userName);
  }

  changePhoto(): void {
    if (this.file) {
      this.userService.changeUserPhoto(this.file);
    }
  }

  onSetPhoto(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      this.file = fileList[0];
    }
  }
}
