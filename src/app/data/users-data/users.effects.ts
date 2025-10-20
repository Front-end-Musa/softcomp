import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../../services/api.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  apiService$ = inject(UsersService)

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
}
