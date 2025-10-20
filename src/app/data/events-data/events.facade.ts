import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompEvent } from '../../models/event.interface';
import { selectAll, selectEventsStatus } from './events.selectores';
import { addEvent, loadEvents } from './events.actions';

@Injectable({
  providedIn: 'root',
})
export class EventsFacade {
  private store = inject(Store);
  events$: Observable<CompEvent[]> = this.store.select(selectAll);
  status$ = this.store.select(selectEventsStatus);

  loadEvents() {
    console.log('dispatching laodEvents()');
    this.store.dispatch(loadEvents());
  }

  addEvent(event: CompEvent) {
    this.store.dispatch(addEvent({ event }));
  }
}
