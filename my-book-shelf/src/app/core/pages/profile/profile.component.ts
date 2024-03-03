import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { AuthFacade } from '../../../store/auth/auth.facade';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DestroyDirective } from '../../directives/destroy/destroy.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DestroyDirective],
})
export class ProfileComponent implements OnInit {
  userName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
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
        this.userName.setValue(username);
      });
  }

  changeUserName(): void {
    if (this.userName.valid) {
      this.userService.changeUsername(this.userName.value);
    }
  }

  changePhoto(): void {
    if (this.file !== null) {
      this.userService.changeUserPhoto(this.file);
    }
  }

  onSetPhoto(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      this.file = fileList[0];
    }
  }
}
