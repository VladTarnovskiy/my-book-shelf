import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IToaster } from '@shared/models/toaster';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  subject = new Subject<IToaster>();
  toast$ = this.subject.asObservable();

  constructor(private translateService: TranslateService) {}

  show({ type, title, message }: IToaster) {
    this.subject.next({ type, title, message });
  }

  showHttpsError(error: HttpErrorResponse) {
    this.subject.next({
      type: 'error',
      title: error.name,
      message: error.message,
    });
  }

  showFireStoreError() {
    this.subject.next({
      type: 'error',
      title: this.translateService.instant('TOASTER.FIREBASE_ERROR.TITLE'),
      message: this.translateService.instant('TOASTER.FIREBASE_ERROR.MESSAGE'),
    });
  }
}
