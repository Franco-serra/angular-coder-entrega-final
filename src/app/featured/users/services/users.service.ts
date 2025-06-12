import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    // Cargar usuarios del db.json al iniciar el servicio
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<User[]>(`${this.apiUrl}/users`)
      .subscribe(users => {
        this.users = users;
      });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      tap(newUser => {
        this.users = [...this.users, newUser];
      })
    );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user).pipe(
      tap(updatedUser => {
        this.users = this.users.map(u => u.id === id ? updatedUser : u);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      tap(() => {
        this.users = this.users.filter(u => u.id !== id);
      })
    );
  }
} 