import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideEffects } from '@ngrx/effects';
import { EventsEffects } from './app/data/events-data/events.effects';
import { UsersEffects } from './app/data/users-data/users.effects';
import { eventsReducer } from './app/data/events-data/events.reducer';
import { usersReducer } from './app/data/users-data/users.reducer';
import { environment } from './app/environment/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideEffects([EventsEffects, UsersEffects]),
    provideStore({
      events: eventsReducer,
      users: usersReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  ],
}).catch((err) => console.error(err));
