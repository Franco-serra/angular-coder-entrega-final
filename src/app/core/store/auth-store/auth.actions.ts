import { createAction, props } from '@ngrx/store';

// Login actions
export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

// Logout actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Set Auth User (existing action)
export const setAuthUser = createAction(
    '[Auth] Set Auth User',
    props<{ payload: {email: string; password: string; role: string;}}>()
);

export const unSetAuthUser = createAction('[Auth] Unset Auth User');
