import { createReducer, on } from '@ngrx/store';
import * as AUTH_ACTIONS from './auth.action';

export interface AuthState {
  userName: string;
  userId: string | null;
}

export const initialState: AuthState = {
  userName: 'Unknown',
  userId: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AUTH_ACTIONS.AddUserName,
    (state, { userName }): AuthState => ({
      ...state,
      userName,
    })
  ),
  on(
    AUTH_ACTIONS.AddUserId,
    (state, { userId }): AuthState => ({
      ...state,
      userId,
    })
  )
);
