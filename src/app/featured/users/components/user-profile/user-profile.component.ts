import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { selectCurrentUser } from '../../../../core/store/auth-store/auth.selectors';
import { User } from '../../models/user.model';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AuthService } from '../../../../core/services/auth.service';
import * as AuthActions from '../../../../core/store/auth-store/auth.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser$;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.store.dispatch(AuthActions.setAuthUser({ payload: currentUser }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onViewDetails(user: User): void {
    this.dialog.open(UserDetailsComponent, {
      width: '500px',
      data: user,
      disableClose: true
    });
  }
} 