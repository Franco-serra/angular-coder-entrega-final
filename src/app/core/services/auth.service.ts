import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth-store/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        if (user.password !== password) {
          throw new Error('Contraseña incorrecta');
        }
        const userData = {
          token: 'mock-token-123',
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return userData;
      }),
      catchError(error => {
        return throwError(() => new Error(error.message || 'Error en la autenticación'));
      })
    );
  }

  logout(): void {
    this.store.dispatch(AuthActions.unSetAuthUser());
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getToken(): string | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).token : null;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
} 