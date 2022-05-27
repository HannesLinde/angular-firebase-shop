import { createReducer, on } from '@ngrx/store';
import { LoginApiActions, LoginPageActions } from '@app/login/store/actions';
import { User } from '@app/core/services/user';
import { getItem } from '@app/core/helpers/Storage';

export interface UserState {
  user: User | null;
  error: string;
  isLoading: boolean;
}

export const initialState: UserState = {
  user: null, // this was used to retrieve user when refresh : getItem('user'), but this may no needed onAuthStateChanged is called
  error: '',
  isLoading: false,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginPageActions.signIn, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(LoginApiActions.signInSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      error: '',
      isLoading: false,
    };
  }),
  on(LoginApiActions.signInError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
      isLoading: false,
    };
  }),
  on(LoginPageActions.signUp, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(LoginApiActions.signUpSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      error: '',
      isLoading: false,
    };
  }),
  on(LoginApiActions.signUpError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
      isLoading: false,
    };
  }),
  on(LoginPageActions.logOut, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(LoginApiActions.logOutSuccess, (state) => {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
      error: '',
      isLoading: false,
    };
  }),
  on(LoginApiActions.logOutError, (state, { errorMessage }): UserState => {
    return {
      ...state,
      error: errorMessage,
      isLoading: false,
    };
  }),
  on(LoginPageActions.updateState, (state, { user }): UserState => {
    return {
      ...state,
      user: user,
      error: '',
      isLoading: false,
    };
  }),
  on(LoginPageActions.setLoading, (state, { isLoading }) => {
    return {
      ...state,
      isLoading,
    };
  }),
  on(LoginPageActions.resetError, (state) => {
    return {
      ...state,
      error: '',
    };
  })
);
