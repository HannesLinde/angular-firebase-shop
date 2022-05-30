import { ProductCategory } from '@app/product-category/models/product-category.model';
import { createAction, props } from '@ngrx/store';

export const loadProductCategoriesSuccess = createAction(
  '[Product Category] Load Success',
  props<{ categories: ProductCategory[] }>()
);

export const loadProductCategoriesFailure = createAction('[Product Category] Load Fail', props<{ error: string }>());

export const deleteProductCategoriesSuccess = createAction('[Product Category API] Delete Success');

export const deleteProductCategoriesFailure = createAction(
  '[Product Category API] Delete Fail',
  props<{ error: string }>()
);
