import { Routes } from '@angular/router';
import { CompetitionsList } from './components/competitions-list/competitions-list';
import { CreateEvent } from './components/create-event/create-event';
import { CompetitionDetails } from './components/competition-details/competition-details';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { WrestlerAccount } from './components/wrestler-account/wrestler-account';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: CompetitionsList },
  { path: 'create-event', component: CreateEvent },
  { path: 'events/:id', component: CompetitionDetails },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'profi',
    component: WrestlerAccount
  }
];
