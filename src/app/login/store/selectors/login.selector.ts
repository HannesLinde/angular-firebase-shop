import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/login.reducer';

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getAuthentification = createSelector(getUserFeatureState, (state) => state.user);

export const getError = createSelector(getUserFeatureState, (state) => state.error);
