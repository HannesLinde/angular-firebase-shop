import { createReducer, on } from '@ngrx/store';
import { User } from '@angular/fire/auth';
import { LoginActions } from '@app/login/store/actions';

export interface UserState {
  user: User | null;
  error: string;
}

export const initialState: UserState = {
  user: null,
  error: '',
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { user }) => {
    console.log('LOGIN SUCCESS');
    return {
      user: user,
      error: '',
    };
  }),
  on(LoginActions.loginFailure, (state, error): UserState => {
    return {
      user: null,
      error: error.errorMessage,
    };
  })
);
