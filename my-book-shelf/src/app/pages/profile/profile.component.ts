import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestroyDirective } from '@core/directives';
import { ToasterService } from '@core/services/toaster';
import { UserService } from '@core/services/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthFacade } from '@store/auth';
import { from, switchMap, takeUntil } from 'rxjs';

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
    private authFacade: AuthFacade,
    private translateService: TranslateService,
    private toasterService: ToasterService
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
      this.userService
        .changeUsername(this.userName.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toasterService.show({
              type: 'success',
              title: this.translateService.instant('TOASTER.NAME_UPDATE.TITLE'),
              message: this.translateService.instant(
                'TOASTER.NAME_UPDATE.MESSAGE'
              ),
            });
          },
          error: () => {
            this.toasterService.showFireStoreError();
          },
        });
    }
  }

  changePhoto(): void {
    if (this.file !== null) {
      from(this.userService.changeUserPhoto(this.file))
        .pipe(
          takeUntil(this.destroy$),
          switchMap((changePhotoFunc) => changePhotoFunc)
        )
        .subscribe({
          next: () => {
            this.toasterService.show({
              type: 'success',
              title: this.translateService.instant(
                'TOASTER.PHOTO_UPDATE.TITLE'
              ),
              message: this.translateService.instant(
                'TOASTER.PHOTO_UPDATE.MESSAGE'
              ),
            });
          },
          error: () => {
            this.toasterService.showFireStoreError();
          },
        });
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
