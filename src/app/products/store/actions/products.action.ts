import { Product } from '@app/products/models/product.model';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Products] Load');

export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Products] Load Fail', props<{ error: string }>());
