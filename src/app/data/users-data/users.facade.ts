import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { User } from "../../models/user.interface";
import { selectAllUsers } from "./users.selectors";
import { loadUsers } from "./users.actions";

@Injectable({ providedIn: 'root' })
export class UsersFacade {
    private store = inject(Store)
    users$: Observable<User[]> = this.store.select(selectAllUsers)

    loadUsers() {
        this.store.dispatch(loadUsers())
    }
}