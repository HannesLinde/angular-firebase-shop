import { UserState } from '@app/login/store/reducers/login.reducer';

// this global state will be extended by feature states
export interface AppState {
  user: UserState;
}
