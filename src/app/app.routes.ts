import { Routes } from '@angular/router';
import { CompetitionsList } from './components/competitions-list/competitions-list';
import { CreateEvent } from './components/create-event/create-event';
import { CompetitionDetails } from './components/competition-details/competition-details';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: CompetitionsList },
  { path: 'create-event', component: CreateEvent },
  { path: 'events/:id', component: CompetitionDetails },
];
