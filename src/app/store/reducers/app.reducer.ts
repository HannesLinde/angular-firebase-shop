import { createReducer, on } from '@ngrx/store';
import { AppPageAction } from '../actions';

// this global state will be extended by feature states
export interface AppState {
  isHandset: boolean;
}

const initialState: AppState = {
  isHandset: false,
};

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppPageAction.setHandSet, (state, { isHandset }): AppState => {
    return {
      ...state,
      isHandset,
    };
  })
);
