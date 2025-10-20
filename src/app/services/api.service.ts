import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { CompEvent } from '../models/event.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  url$ = 'https://competitions-faac4-default-rtdb.firebaseio.com/users';
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  addUser(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  firestore = inject(Firestore);
  private eventsRef = collection(this.firestore, 'competitions');

  getEvents(): Observable<CompEvent[]> {
    return collectionData(this.eventsRef, { idField: 'id' }) as Observable<CompEvent[]>;
  }

  addEvent(event: CompEvent) {
    const eventCreate = {
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      participants: event.participants || [],
      maxParticipants: event.maxParticipants || 0,
    };
    const promise = addDoc(this.eventsRef, eventCreate).then(response => response.id);
    return from(promise)
  }

}
