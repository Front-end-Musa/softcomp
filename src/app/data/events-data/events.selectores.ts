import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventsAdapter, EventsState } from './events.reducer';

export const selectEventsState = createFeatureSelector<EventsState>('events');

export const {
  selectAll,
  selectEntities: selectEventsEntities,
  selectIds: selectEventsIds,
  selectTotal: selectEventsTotal,
} = eventsAdapter.getSelectors(selectEventsState);

export const selectEventsStatus = createSelector(selectEventsState, (state) => state.status);
