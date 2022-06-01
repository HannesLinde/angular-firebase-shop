import { createAction, props } from '@ngrx/store';

export const setHandSet = createAction('[Root Page] Headset Mode', props<{ isHandset: boolean }>());
