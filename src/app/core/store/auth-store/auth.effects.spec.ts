import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle successful login', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const user = { id: 1, email: 'test@test.com' };

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: AuthActions.login(credentials) });
      
      authService.login.and.returnValue(cold('--b', { b: user }));

      expectObservable(effects.login$).toBe('---c', {
        c: AuthActions.loginSuccess({ user })
      });
    });
  });

  it('should handle login failure', () => {
    const credentials = { email: 'test@test.com', password: 'wrong' };
    const error = new Error('Invalid credentials');

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: AuthActions.login(credentials) });
      
      authService.login.and.returnValue(cold('--#', {}, error));

      expectObservable(effects.login$).toBe('---c', {
        c: AuthActions.loginFailure({ error })
      });
    });
  });

  it('should navigate to dashboard on login success', () => {
    const user = { id: 1, email: 'test@test.com' };
    
    testScheduler.run(({ hot }) => {
      actions$ = hot('-a', { a: AuthActions.loginSuccess({ user }) });
      
      effects.loginSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
      });
    });
  });

  it('should handle logout', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      actions$ = hot('-a', { a: AuthActions.logout() });
      
      expectObservable(effects.logout$).toBe('-b', {
        b: AuthActions.logoutSuccess()
      });

      effects.logout$.subscribe(() => {
        expect(authService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
      });
    });
  });
}); 