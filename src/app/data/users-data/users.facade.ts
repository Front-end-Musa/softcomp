import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.interface';
import { selectAllUsers, selectIsLoggedIn, selectUser } from './users.selectors';
import { initUser, loadUsers, loginUser, registerUser } from './users.actions';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private store = inject(Store);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectUser);

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  registerUser(user: User) {
    this.store.dispatch(registerUser({ user }));
  }

  loginUser(email: string, password: string) {
    this.store.dispatch(loginUser({ email, password }));
  }

  initUser() {
    this.store.dispatch(initUser());
  }
}
