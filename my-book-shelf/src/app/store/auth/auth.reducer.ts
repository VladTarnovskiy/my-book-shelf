import { createReducer, on } from '@ngrx/store';
import * as AUTH_ACTIONS from './auth.action';

export interface AuthState {
  userName: string;
}

export const initialState: AuthState = {
  userName: 'Unknown',
};

export const authReducer = createReducer(
  initialState,
  on(
    AUTH_ACTIONS.AddUserName,
    (state, { userName }): AuthState => ({
      ...state,
      userName,
    })
  )
);
