import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureName } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => state.authUser
);

export const selectCurrentUser = selectAuthUser;

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => !!state.authUser
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectIsAdmin = createSelector(
    selectAuthUser,
    (user) => user?.role === 'admin'
); 