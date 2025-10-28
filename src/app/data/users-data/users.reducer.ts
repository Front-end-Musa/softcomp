import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.interface';
import {
  initUser,
  initUserFailure,
  initUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from './users.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
  user: User | null;
  role: 'wrestler' | 'organizer' | null;
  status: 'init' | 'loading' | 'loaded' | 'error' | string;
  error: null | string;
}

export const usersAdapter = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  user: null,
  role: null,
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
  })),

  on(registerUserSuccess, (state, { user }) => {
    return usersAdapter.addOne(user, {
      ...state,
      role: user.role,
      status: 'loaded',
    });
  }),

  on(loginUser, registerUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loginUserSuccess, registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    role: user.role,
    loading: false,
  })),

  on(loginUserFailure, registerUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(initUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(initUserSuccess, (state, { user }) => ({
    ...state,
    user,
    role: user.role,
    loading: false,
  })),
  on(initUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
