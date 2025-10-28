import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsersFacade } from './data/users-data/users.facade';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, RouterModule, MatToolbarModule, CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  showLayout = true;

  constructor(private router: Router, private usersFacade: UsersFacade) {
    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Hide layout if the user is on /auth/login or /auth/register
        const url = event.urlAfterRedirects;
        this.showLayout = !url.includes('/auth/login') && !url.includes('/auth/register');
      });
  }

  ngOnInit(): void {
    this.usersFacade.initUser();
  }
}
