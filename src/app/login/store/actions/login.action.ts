import { createAction, props } from '@ngrx/store';
import { User } from '@angular/fire/auth';

export interface LoginData {
  email: string;
  password: string;
}

export const loginSubmission = createAction('[login] submit', props<{ loginData: LoginData }>());

export const loginSuccess = createAction('[login] login success', props<{ user: User }>());

export const loginFailure = createAction('[login] login Fail', props<{ errorMessage: string }>());
