import { User } from '@angular/fire/auth';
import { createAction, props } from '@ngrx/store';

export const signInSuccess = createAction('[Login API] Sign in Success', props<{ user: User }>());

export const signInError = createAction('[Login API] Sign in Error', props<{ errorMessage: string }>());

export const signUpSuccess = createAction('[Login API] Sign up Success', props<{ user: User }>());

export const signUpError = createAction('[Login API] Sign up Error', props<{ errorMessage: string }>());

export const logOutSuccess = createAction('[Login API] Log out Success');

export const logOutError = createAction('[Login API] Log out Error', props<{ errorMessage: string }>());
