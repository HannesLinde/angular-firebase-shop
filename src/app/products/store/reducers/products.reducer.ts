import { Product } from '@app/products/models/product.model';
import { createReducer, on } from '@ngrx/store';
import { ProductActions } from '../actions';

export interface ProductState {
  products: Product[];
  error: string;
}

export const initialState: ProductState = {
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  })
);
