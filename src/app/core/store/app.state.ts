import { AuthState } from './auth-store/auth.reducer';
import { UsersState } from '../../featured/users/models/user.model';

export interface AppState {
  auth: AuthState;
  users: UsersState;
} 