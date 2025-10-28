import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventsService } from '../../services/api.service';
import {
  addEvent,
  addEventFailure,
  addEventSuccess,
  loadEventById,
  loadEventByIdFailure,
  loadEventByIdSuccess,
  loadEvents,
  loadEventsFailure,
  loadEventsSuccess,
} from './events.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EventsEffects {
  actions$ = inject(Actions);
  apiService$ = inject(EventsService);

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      mergeMap(() =>
        this.apiService$.getEvents().pipe(
          map((events) => loadEventsSuccess({ events })),
          catchError((error) => of(loadEventsFailure({ error })))
        )
      )
    )
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEvent),
      mergeMap((action: any) =>
        this.apiService$.addEvent(action.event).pipe(
          map((result) => addEventSuccess({ result })),
          catchError((error) => of(addEventFailure({ error })))
        )
      )
    )
  );

  loadEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventById),
      mergeMap((action) =>
        this.apiService$.getEventById(action.id).pipe(
          map((event) => loadEventByIdSuccess({ event })),
          catchError((error) => of(loadEventByIdFailure({ error })))
        )
      )
    )
  );
}
