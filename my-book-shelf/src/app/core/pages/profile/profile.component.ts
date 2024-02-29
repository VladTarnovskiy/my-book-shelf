import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DestroyDirective } from '../../directives/destroy/destroy.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class ProfileComponent implements OnInit {
  userName = '';
  file: File | null = null;
  private destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private userService: UserService,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.userName$
      .pipe(takeUntil(this.destroy$))
      .subscribe((username) => {
        this.userName = username;
      });
  }

  changeUserName(): void {
    if (this.userName !== '') {
      this.userService.changeUsername(this.userName);
    }
  }

  changePhoto(): void {
    if (this.file !== null) {
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
