import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
    authUser: any | null;
    error: any | null;
    loading: boolean;
}

export const initialState: AuthState = {
    authUser: null,
    error: null,
    loading: false
};

export const authReducer = createReducer<AuthState>(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        authUser: user,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        authUser: null,
        loading: false,
        error
    })),
    on(AuthActions.setAuthUser, (state, { payload }) => ({
        ...state,
        authUser: payload,
        loading: false,
        error: null
    })),
    on(AuthActions.logout, AuthActions.unSetAuthUser, () => ({
        ...initialState
    }))
);

