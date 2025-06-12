import { createFeature, createSelector } from '@ngrx/store';
import { usersFeature } from './users.reducer';

export const selectUsersState = usersFeature.selectUsersState;
export const selectUsers = usersFeature.selectUsers;
export const selectSelectedUser = usersFeature.selectSelectedUser;
export const selectLoading = usersFeature.selectLoading;
export const selectError = usersFeature.selectError; 