import { ProductCategory } from '@app/product-category/models/product-category.model';
import { createAction, props } from '@ngrx/store';

export const loadProductCategories = createAction('[Product Category] Load');

export const loadProductCategoriesSuccess = createAction(
  '[Product Category] Load Success',
  props<{ categories: ProductCategory[] }>()
);

export const loadProductCategoriesFailure = createAction('[Product Category] Load Fail', props<{ error: string }>());
