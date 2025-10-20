import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CompEvent } from '../../models/event.interface';
import { createReducer, on } from '@ngrx/store';
import { loadEvents, loadEventsFailure, loadEventsSuccess } from './events.actions';

export interface EventsState extends EntityState<CompEvent> {
  status: 'init' | 'loading' | 'loaded' | 'error' | string;
  error: null | string;
}

export const eventsAdapter = createEntityAdapter<CompEvent>();

const initialState = eventsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const eventsReducer = createReducer(
  initialState,

  on(loadEvents, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(loadEventsSuccess, (state, { events }) =>
    eventsAdapter.setAll(events, {
      ...state,
      status: 'loaded'
    })
  ),
  on(loadEventsFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  }))
);
