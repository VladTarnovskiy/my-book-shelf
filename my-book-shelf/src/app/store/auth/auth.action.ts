import { createAction, props } from '@ngrx/store';

const actionSource = '[Auth]';

export const AddUserName = createAction(
  `${actionSource} Add Username`,
  props<{ userName: string }>()
);

export const AddUserId = createAction(
  `${actionSource} Add UserId`,
  props<{ userId: string | null }>()
);

export const AddUserPhoto = createAction(
  `${actionSource} Add User Photo`,
  props<{ photo: string | null }>()
);

export const ChangeUserIsLoading = createAction(
  `${actionSource} Change User Loading`,
  props<{ isLoading: boolean }>()
);
