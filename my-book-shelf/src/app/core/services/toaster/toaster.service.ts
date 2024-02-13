import { Subject } from 'rxjs';
import { Toaster, ToasterType } from '../../interfaces/toaster';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  subject = new Subject<Toaster>();
  toast$ = this.subject.asObservable();

  show(type: ToasterType, title: string, body: string) {
    this.subject.next({ type, title, body, delay: 4000 });
  }
}
