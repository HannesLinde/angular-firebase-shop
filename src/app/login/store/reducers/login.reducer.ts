import { createReducer, on } from '@ngrx/store';
import { User } from '@angular/fire/auth';
import { LoginApiActions } from '@app/login/store/actions';

export interface UserState {
  user: User | undefined;
  isAuthenticated: boolean;
  error: string;
}

export const initialState: UserState = {
  user: undefined,
  isAuthenticated: false,
  error: '',
};

export const loginReducer = createReducer(
  initialState,
  on(LoginApiActions.signInSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isAuthenticated: true,
      error: '',
    };
  }),
  on(LoginApiActions.signInError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
    };
  }),
  on(LoginApiActions.signUpSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isAuthenticated: true,
      error: '',
    };
  }),
  on(LoginApiActions.signUpError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
    };
  }),
  on(LoginApiActions.logOutSuccess, (state) => {
    return {
      ...state,
      user: undefined,
      isAuthenticated: false,
      error: '',
    };
  }),
  on(LoginApiActions.logOutError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
    };
  })
);
