import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getRootState = createFeatureSelector<AppState>('root');

export const getHandSet = createSelector(getRootState, (state) => state.isHandset);
