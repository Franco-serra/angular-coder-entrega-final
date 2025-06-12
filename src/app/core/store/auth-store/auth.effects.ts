import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    login$;
    loginSuccess$;
    loginFailure$;
    logout$;

    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.login$ = createEffect(() => 
            this.actions$.pipe(
                ofType(AuthActions.login),
                mergeMap(action =>
                    this.authService.login(action.email, action.password).pipe(
                        map(user => AuthActions.loginSuccess({ user })),
                        catchError(error => of(AuthActions.loginFailure({ error })))
                    )
                )
            )
        );

        this.loginSuccess$ = createEffect(() => 
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ user }) => {
                    this.router.navigate(['/dashboard']);
                })
            ),
            { dispatch: false }
        );

        this.loginFailure$ = createEffect(() => 
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    console.error('Login error:', error);
                })
            ),
            { dispatch: false }
        );

        this.logout$ = createEffect(() => 
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout();
                })
            ),
            { dispatch: false }
        );
    }
} 