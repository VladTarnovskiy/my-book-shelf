import { createReducer, on } from '@ngrx/store';
import * as AUTH_ACTIONS from './auth.action';

export interface AuthState {
  userName: string;
  userId: string | null;
  photo: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  userName: 'Unknown',
  userId: null,
  photo: null,
  isLoading: false,
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
  ),
  on(
    AUTH_ACTIONS.AddUserPhoto,
    (state, { photo }): AuthState => ({
      ...state,
      photo,
    })
  ),
  on(
    AUTH_ACTIONS.ChangeUserIsLoading,
    (state, { isLoading }): AuthState => ({
      ...state,
      isLoading,
    })
  )
);
