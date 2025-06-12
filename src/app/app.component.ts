import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectAuthUser } from './core/store/auth-store/auth.selectors';
import { MatDrawer } from '@angular/material/sidenav';
import { TitleService } from './core/services/title.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'angular-coder';
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<any>;
  title$: Observable<string>;

  constructor(
    private store: Store,
    private titleService: TitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.authUser$ = this.store.select(selectAuthUser);
    this.title$ = this.titleService.title$;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.titleService.setTitle(data['title'] || 'Inicio');
    });
  }
} 