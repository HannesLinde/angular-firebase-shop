import { createAction, props } from '@ngrx/store';

export const deleteProductCategories = createAction(
  '[Product Category Page] Delete Category',
  props<{ categoryId: string }>()
);

export const loadProductCategories = createAction('[Product Category] Load');

export const setLoading = createAction('[Product Category Page] Set Loading', props<{ isLoading: false }>());
