import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AUTH_ACTIONS from './auth.action';
import { selectUserName } from './auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  userName$ = this.store.select(selectUserName);

  constructor(private store: Store) {}

  addUserName(userName: string) {
    this.store.dispatch(AUTH_ACTIONS.AddUserName({ userName }));
  }
}
