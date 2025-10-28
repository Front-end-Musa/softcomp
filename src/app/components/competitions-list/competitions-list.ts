import { Component, OnDestroy, OnInit, OutputRefSubscription } from '@angular/core';
import { EventsFacade } from '../../data/events-data/events.facade';
import { CompEvent } from '../../models/event.interface';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-competitions-list',
  imports: [
    AsyncPipe,
    DatePipe,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './competitions-list.html',
  styleUrl: './competitions-list.scss',
})
export class CompetitionsList implements OnInit {
  events!: Observable<CompEvent[]>;
  status!: Observable<string>;
  constructor(
    private eventsFacade: EventsFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventsFacade.loadEvents();
    this.events = this.eventsFacade.events$;
    this.status = this.eventsFacade.status$;
    console.log(this.events.subscribe((data) => console.log(data)));
    this.events.subscribe((events) => {
      console.log('Events:', events);
      events.forEach((event) => console.log('maxParticipants:', event.maxParticipants));
    });
  }

  goToEventDetails(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }

  onAction(event: any, action: 'edit' | 'delete') {
    event.stopPropagation();
    switch (action) {
      case 'edit':
        this.router.navigate(['/events/edit', event.id]);
        break;
      case 'delete':
        // Add delete logic here
        break;
    }
  }
}
