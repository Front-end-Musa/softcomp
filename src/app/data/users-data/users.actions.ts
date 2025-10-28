import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.interface';

// Load users
export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

// Add user
export const addUser = createAction('[Users] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[Users] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[Users] Add User Failure', props<{ error: any }>());

export const registerUser = createAction(
  '[Users] Register User',
  props<{ user: User }>()
);
export const registerUserSuccess = createAction(
  '[Users] Register User Success',
  props<{ user: User }>()
);
export const registerUserFailure = createAction(
  '[Users] Register User Failure',
  props<{ error: any }>()
);

export const loginUser = createAction(
  '[Users] Login User',
  props<{ email: string; password: string }>()
);
export const loginUserSuccess = createAction('[Users] Login User Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Users] Login User Failure', props<{ error: any }>());

export const initUser = createAction('[Users] Init User');
export const initUserSuccess = createAction('[Users] Init User Success', props<{ user: User }>());
export const initUserFailure = createAction('[Users] Init User Failure', props<{ error: any }>());
