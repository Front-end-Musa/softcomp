import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../../services/api.service';
import { initUser, initUserFailure, initUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, loginUser, loginUserFailure, loginUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from './users.actions';

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  apiService$ = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.apiService$.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap(({ user }) =>
        this.apiService$.registerUser(user).pipe(
          map((user) => registerUserSuccess({ user })),
          catchError((error) => of(registerUserFailure({ error })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap(({ email, password }) =>
        this.apiService$.loginUser(email, password).pipe(
          map((user) => loginUserSuccess({ user })),
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );

  initUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUser),
      mergeMap(() =>
        of(this.apiService$.initUser()).pipe(
          map((user) => initUserSuccess({ user })),
          catchError((error) => of(initUserFailure({ error })))
        )
      )
    )
  );
}
