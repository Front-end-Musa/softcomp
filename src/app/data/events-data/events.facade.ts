import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompEvent } from '../../models/event.interface';
import { selectAll, selectEventById, selectEventsStatus } from './events.selectores';
import { addEvent, loadEventById, loadEvents } from './events.actions';

@Injectable({
  providedIn: 'root',
})
export class EventsFacade {
  private store = inject(Store);
  events$: Observable<CompEvent[]> = this.store.select(selectAll);
  status$ = this.store.select(selectEventsStatus);
  eventById$: Observable<CompEvent | null> = this.store.select(selectEventById(''));

  loadEvents() {
    console.log('dispatching loadEvents()');
    this.store.dispatch(loadEvents());
  }

  addEvent(event: CompEvent) {
    this.store.dispatch(addEvent({ event }));
  }

  loadEventById(id: string) {
    this.store.dispatch(loadEventById({ id }));
    this.eventById$ = this.store.select(selectEventById(id));
  }
}
