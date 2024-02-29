import { Subject } from 'rxjs';
import { Toaster } from '../../models/toaster';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  subject = new Subject<Toaster>();
  toast$ = this.subject.asObservable();

  show({ type, title, message }: Toaster) {
    this.subject.next({ type, title, message });
  }
}
