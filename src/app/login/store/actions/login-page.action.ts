import { User } from '@app/core/services/user';
import { createAction, props } from '@ngrx/store';

export interface LoginData {
  email: string;
  password: string;
  displayName: string | null;
}

export const signIn = createAction('[Login Page] Sign in', props<{ loginData: LoginData }>());

export const signInWithProvider = createAction(
  '[Login Page] Sign in with provider',
  props<{ provider: 'Google' | 'Facebook' }>()
);

export const signUp = createAction('[Login Page] Sign up', props<{ loginData: LoginData }>());

export const logOut = createAction('[Login Page] Log out');

export const updateState = createAction('[Login Page] Update State', props<{ user: User | null }>());

export const setLoading = createAction('[Login Page] Set Loading', props<{ isLoading: false }>());

export const resetError = createAction('[Login Page] Set Loading');
