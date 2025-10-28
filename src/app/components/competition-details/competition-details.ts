import { ChangeDetectorRef, Component } from '@angular/core';
import { CompEvent } from '../../models/event.interface';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { EventsFacade } from '../../data/events-data/events.facade';

@Component({
  selector: 'app-competition-details',
  imports: [CommonModule],
  templateUrl: './competition-details.html',
  styleUrl: './competition-details.scss',
})
export class CompetitionDetails {
  competitionId!: string;
  eventData: CompEvent | null = null;

  constructor(private route: ActivatedRoute, private eventsFacade: EventsFacade, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.eventsFacade.loadEventById(this.route.snapshot.queryParams['id'] || this.route.snapshot.params['id']);
    this.eventsFacade.eventById$.subscribe((event) => {
      this.eventData = event;
      this.cdr.detectChanges();
      console.log('Loaded event data:', this.eventData);
    });
  }

  register() {
    if (this.eventData) {
      alert(`Registered for event: ${this.eventData.name}`);
    }
  }
}
