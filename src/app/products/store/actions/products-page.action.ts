import { createAction, props } from '@ngrx/store';

export const displayMode = createAction('[Products Page] Display Mode', props<{ displayMode: string }>());

export const setLoading = createAction('[Products Page] Set Loading', props<{ isLoading: boolean }>());
