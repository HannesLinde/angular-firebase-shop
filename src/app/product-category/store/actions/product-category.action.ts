import { ProductCategoryItem } from '@app/product-category/product-category-datasource';
import { createAction, props } from '@ngrx/store';

export const loadProductCategories = createAction('[Product Category] Load');

export const loadProductCategoriesSuccess = createAction(
  '[Product Category] Load Success',
  props<{ categories: ProductCategoryItem[] }>()
);

export const loadProductCategoriesFailure = createAction('[Product Category] Load Fail', props<{ error: string }>());
