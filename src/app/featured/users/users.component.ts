import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { UsersActions } from './store/users.actions';
import { selectUsers, selectLoading, selectSelectedUser } from './store/users.selectors';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from './models/user.model';
import { selectIsAdmin } from '../../core/store/auth-store/auth.selectors';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    UserFormComponent
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  users$;
  loading$;
  selectedUser$;
  isAdmin$;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: User[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);

    this.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.dataSource = users;
    });

    this.selectedUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.openUserDialog(user);
      }
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    const title = this.route.snapshot.data['title'] || 'Usuarios';
    this.titleService.setTitle(title);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  onDelete(userId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.store.dispatch(UsersActions.deleteUser({ userId }));
      setTimeout(() => this.loadUsers(), 100);
    }
  }

  onEdit(userId: string): void {
    const user = this.dataSource.find(u => u.id === userId);
    if (user) {
      this.openUserDialog(user);
    }
  }

  onView(userId: string): void {
    const user = this.dataSource.find(u => u.id === userId);
    if (user) {
      this.openUserDialog(user);
    }
  }

  onCreate(): void {
    this.openUserDialog();
  }

  private openUserDialog(user?: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.loadUsers();
        }
        this.store.dispatch(UsersActions.clearSelectedUser());
      });
  }
} 