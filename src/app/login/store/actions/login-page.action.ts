import { createAction, props } from '@ngrx/store';

export interface LoginData {
  email: string;
  password: string;
  displayName: string | null;
}

export const signIn = createAction('[Login Page] Sign in', props<{ loginData: LoginData }>());

export const signUp = createAction('[Login Page] Sign up', props<{ loginData: LoginData }>());

export const logOut = createAction('[Login Page] Log out');
