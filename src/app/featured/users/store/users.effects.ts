import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$;
  createUser$;
  updateUser$;
  deleteUser$;

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {
    this.loadUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsersActions.loadUsers),
        mergeMap(() => this.usersService.getUsers()
          .pipe(
            map(users => UsersActions.loadUsersSuccess({ users })),
            catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
          ))
      );
    });

    this.createUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsersActions.createUser),
        exhaustMap((action) => this.usersService.createUser(action.user)
          .pipe(
            map(newUser => UsersActions.createUserSuccess({ user: newUser })),
            catchError(error => of(UsersActions.createUserFailure({ error: error.message })))
          ))
      );
    });

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsersActions.updateUser),
        mergeMap((action) =>
          this.usersService.updateUser(action.userId.toString(), action.user).pipe(
            map(updatedUser =>
              UsersActions.updateUserSuccess({ user: updatedUser })
            ),
            catchError(error =>
              of(UsersActions.updateUserFailure({ error: error.message }))
            )
          )
        )
      );
    });
    
    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsersActions.deleteUser),
        mergeMap((action) =>
          this.usersService.deleteUser(action.userId.toString()).pipe(
            map(() =>
              UsersActions.deleteUserSuccess({ userId: action.userId.toString() })
            ),
            catchError(error =>
              of(UsersActions.deleteUserFailure({ error: error.message }))
            )
          )
        )
      );
    });
  }
}