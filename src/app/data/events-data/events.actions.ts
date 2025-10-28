import { createAction, props } from '@ngrx/store';
import { CompEvent } from '../../models/event.interface';

export const loadEvents = createAction('[Events/API] Load Events');
export const loadEventsSuccess = createAction(
  '[Events/API] Load Events Success',
  props<{ events: CompEvent[] }>()
);
export const loadEventsFailure = createAction(
  '[Events/API] Load Events Failure',
  props<{ error: any }>()
);

export const addEvent = createAction(
  '[Events/API] Add Event',
  props<{ event: CompEvent }>()
);
export const addEventSuccess = createAction(
  '[Events/API] Add Event Success',
  props<{ result: string }>()
);
export const addEventFailure = createAction(
  '[Events/API] Add Event Failure',
  props<{ error: any }>()
);

export const loadEventById = createAction(
  '[Events/API] Load Event By Id',
  props<{ id: string }>()
);
export const loadEventByIdSuccess = createAction(
  '[Events/API] Load Event By Id Success',
  props<{ event: CompEvent | null }>()
);
export const loadEventByIdFailure = createAction(
  '[Events/API] Load Event By Id Failure',
  props<{ error: any }>()
);
