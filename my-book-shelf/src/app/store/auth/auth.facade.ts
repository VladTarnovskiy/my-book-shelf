import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AUTH_ACTIONS from './auth.action';
import { selectUserId, selectUserName } from './auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  userName$ = this.store.select(selectUserName);
  userId$ = this.store.select(selectUserId);

  constructor(private store: Store) {}

  addUserName(userName: string) {
    this.store.dispatch(AUTH_ACTIONS.AddUserName({ userName }));
  }

  addUserId(userId: string | null) {
    this.store.dispatch(AUTH_ACTIONS.AddUserId({ userId }));
  }
}
