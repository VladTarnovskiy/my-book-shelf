import { createAction, props } from '@ngrx/store';

const actionSource = '[Auth]';

export const AddUserName = createAction(
  `${actionSource} Add Username`,
  props<{ userName: string }>()
);
