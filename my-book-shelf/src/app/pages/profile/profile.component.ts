import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestroyDirective } from '@core/directives';
import { UserService } from '@core/services/user';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@store/auth';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, NgClass],
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
