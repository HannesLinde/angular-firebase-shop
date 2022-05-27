import { createAction, props } from '@ngrx/store';

export const deleteProductCategories = createAction(
  '[Product Category Page] Delete Category',
  props<{ categoryId: string }>()
);
