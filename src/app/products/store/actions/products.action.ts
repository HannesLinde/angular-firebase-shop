import { Product } from '@app/products/models/product.model';
import { createAction, props } from '@ngrx/store';

export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Products] Load Fail', props<{ error: string }>());

export const getProduct = createAction('[Products] Get product', props<{ id: string }>());

export const getProductSuccess = createAction('[Products] Get product Success', props<{ product: Product }>());

export const getProductFailure = createAction('[Products] Get product Fail', props<{ error: string }>());
