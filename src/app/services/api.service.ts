import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { CompEvent } from '../models/event.interface';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class UsersService {
  auth = getAuth();
  user = signal<User | null>(null);
  url$ = 'https://competitions-faac4-default-rtdb.firebaseio.com/users';
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  registerUser(user: User) {
    return from(createUserWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user.uid;
        const userRef = doc(this.firestore, 'users', uid);
        const refreshToken = userCredential.user.refreshToken;
        localStorage.setItem('accessToken', JSON.stringify(refreshToken));
        return from(
          setDoc(userRef, {
            user
          })
        );
      }),
      tap(() => console.log('User registered successfully with role:',user.role)),
      catchError((err) => {
        console.error('Error registering user:', err);
        return of(err);
      })
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then((response) => {
      localStorage.setItem('accessToken', JSON.stringify(response.user.refreshToken));
      return response.user;
    });
    return from(promise);
  }

  logout() {
    this.auth.signOut();
  }

  initUser() {
    const token = localStorage.getItem('accessToken');
    const parsedToken = JSON.parse(token || 'null');
    this.user.set(parsedToken);
    return parsedToken;
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
    const promise = addDoc(this.eventsRef, eventCreate).then((response) => response.id);
    return from(promise);
  }

  getEventById(id: string): Observable<CompEvent | null> {
    const eventRef = doc(this.firestore, `competitions/${id}`);
    return docData(eventRef, { idField: 'id' }) as Observable<CompEvent | null>;
  }
}
