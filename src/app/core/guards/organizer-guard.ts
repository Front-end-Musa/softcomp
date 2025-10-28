import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { selectUserRole } from "../../data/users-data/users.selectors";
import { UsersState } from "../../data/users-data/users.reducer";

@Injectable({ providedIn: 'root' })
export class OrganizerGuard implements CanActivate {
  constructor(private store: Store<UsersState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (role === 'organizer') return true;
        this.router.navigate(['/not-authorized']);
        return false;
      })
    );
  }
}
