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
