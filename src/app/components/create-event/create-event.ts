import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsFacade } from '../../data/events-data/events.facade';
import { CompEvent } from '../../models/event.interface';

@Component({
  selector: 'app-create-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {
  constructor(formBuilder: FormBuilder, private eventsFacade: EventsFacade) {
    this.eventForm = formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      location: ['City', Validators.required],
      createdBy: ['User'],
      maxParticipants: [100],
      status: ['open', Validators.required],
      // imageUrl: [''],
      // link: ['']
    });
  }
  eventForm: FormGroup;

  onSubmit() {
    if (this.eventForm.valid) {
      const event: CompEvent = {
        name: this.eventForm.value.name.toString(),
        date: new Date(this.eventForm.value.date).toLocaleString(),
        description: this.eventForm.value.description.toString(),
        location: this.eventForm.value.location.toString(),
        createdBy: this.eventForm.value.createdBy.toString(),
        maxParticipants: this.eventForm.value.maxParticipants,
        createdAt: new Date().toString(),
        participants: [],
        status: this.eventForm.value.status.toString() as 'open' | 'closed',
      };
      this.eventsFacade.addEvent(event);
      console.log('Event Created:', event);
      console.log(this.eventsFacade.events$);
    } else {
      console.log('Form is invalid');
    }
  }
}
