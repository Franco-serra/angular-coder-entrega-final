import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth-store/auth.reducer';
import { counterReducer, CounterState } from './counter/counter.reducer';

export interface AppState {
  auth: AuthState;
}

export interface RootState {
  auth: AuthState;
  counter: CounterState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  auth: authReducer,
  counter: counterReducer
};

export * from './app.state';
export * from './auth-store/auth.actions';
export * from './auth-store/auth.reducer';
export * from './auth-store/auth.selectors';
export * from './auth-store/auth.effects';