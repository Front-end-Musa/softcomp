import { createFeatureSelector } from '@ngrx/store';
import { UsersState, usersAdapter } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUserTotal,
} = usersAdapter.getSelectors(selectUsersState);