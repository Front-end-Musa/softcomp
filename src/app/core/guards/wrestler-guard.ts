import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { UsersState } from "../../data/users-data/users.reducer";
import { selectUserRole } from "../../data/users-data/users.selectors";

@Injectable({ providedIn: 'root' })
export class WrestlerGuard implements CanActivate {
  constructor(private store: Store<UsersState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (role === 'wrestler') return true;
        this.router.navigate(['/not-authorized']);
        return false;
      })
    );
  }
}
