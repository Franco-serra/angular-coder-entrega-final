import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersState } from '../models/user.model';
import { User } from '../models/user.model';
import { UsersActions } from './users.actions';

export const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    
    on(UsersActions.loadUsers, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false
    })),
    
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    
    on(UsersActions.createUser, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    on(UsersActions.createUserSuccess, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
      loading: false
    })),
    
    on(UsersActions.createUserFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    
    on(UsersActions.updateUser, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    on(UsersActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map((u: User) => u.id === user.id ? user : u),
      loading: false
    })),
    
    on(UsersActions.updateUserFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    
    on(UsersActions.deleteUser, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    on(UsersActions.deleteUserSuccess, (state, { userId }) => ({
      ...state,
      users: state.users.filter((u: User) => u.id !== userId.toString()),
      loading: false
    })),
    
    on(UsersActions.deleteUserFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    
    on(UsersActions.setSelectedUser, (state, { userId }) => ({
      ...state,
      selectedUser: state.users.find((u: User) => u.id === userId.toString()) || null
    })),
    
    on(UsersActions.clearSelectedUser, (state) => ({
      ...state,
      selectedUser: null
    }))
  )
}); 