import { Product } from '@app/products/models/product.model';
import { createReducer, on } from '@ngrx/store';
import { ProductActions, ProductPageActions } from '../actions';

export interface ProductState {
  product: any;
  products: Product[];
  error: string;
  displayMode: string;
}

export const initialState: ProductState = {
  products: [],
  product: undefined,
  error: '',
  displayMode: 'Grid',
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
  }),
  on(ProductActions.getProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.product,
      error: '',
    };
  }),
  on(ProductActions.getProductFailure, (state, action): ProductState => {
    return {
      ...state,
      product: undefined,
      error: action.error,
    };
  }),
  on(ProductPageActions.displayMode, (state, action): ProductState => {
    return {
      ...state,
      displayMode: action.displayMode,
    };
  })
);
