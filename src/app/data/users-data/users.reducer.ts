import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.interface';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
  status: 'init' | 'loading' | 'loaded' | 'error' | string;
  error: null | string;
}

export const usersAdapter = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const usersReducer = createReducer(
  initialState,

  on(loadUsers, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),

  on(loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, {
      ...state,
      status: 'loaded',
    })
  ),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  }))
);
