import { createReducer, on } from '@ngrx/store';
import { LoginApiActions, LoginPageActions } from '@app/login/store/actions';
import { User } from '@app/core/services/user';
import { getItem } from '@app/core/helpers/Storage';

export interface UserState {
  user: User | null;
  error: string;
}

export const initialState: UserState = {
  user: null, // this was used to retrieve user when refresh : getItem('user'), but this may no needed onAuthStateChanged is called
  error: '',
};

export const loginReducer = createReducer(
  initialState,
  on(LoginApiActions.signInSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
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
      user: null,
      isAuthenticated: false,
      error: '',
    };
  }),
  on(LoginApiActions.logOutError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
    };
  }),
  on(LoginPageActions.updateState, (state, { user }): UserState => {
    return {
      ...state,
      user: user,
      error: '',
    };
  })
);
