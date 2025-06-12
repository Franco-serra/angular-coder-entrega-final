import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth-store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as string[];
    
    return this.store.select(selectAuthUser).pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        if (requiredRoles && requiredRoles.length > 0) {
          if (!requiredRoles.includes(user.role)) {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }

        return true;
      })
    );
  }
} 