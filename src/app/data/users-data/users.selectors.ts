import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersAdapter } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUserTotal,
} = usersAdapter.getSelectors(selectUsersState);

export const selectUser = createSelector(selectUsersState, (state) => state.user);
export const selectIsLoggedIn = createSelector(selectUser, (user) => !!user);
export const selectLoading = createSelector(selectUsersState, (state) => state.status === 'loading');
export const selectError = createSelector(selectUsersState, (state) => state.error);
export const selectUserRole = createSelector(selectUsersState, (state) => state.role);