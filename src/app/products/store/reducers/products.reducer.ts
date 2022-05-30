import { Product } from '@app/products/models/product.model';
import { createReducer, on } from '@ngrx/store';
import { ProductActions, ProductPageActions } from '../actions';

export interface ProductState {
  product: any;
  products: Product[];
  error: string;
  displayMode: string;
  isLoading: boolean;
}

export const initialState: ProductState = {
  products: [],
  product: undefined,
  error: '',
  displayMode: 'Grid',
  isLoading: false,
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.loadProducts, (state): ProductState => {
    return {
      ...state,
      error: '',
      isLoading: true,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
      isLoading: false,
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(ProductActions.getProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      product: action.product,
      error: '',
      isLoading: false,
    };
  }),
  on(ProductActions.getProductFailure, (state, action): ProductState => {
    return {
      ...state,
      product: undefined,
      error: action.error,
      isLoading: false,
    };
  }),
  on(ProductPageActions.displayMode, (state, action): ProductState => {
    return {
      ...state,
      displayMode: action.displayMode,
    };
  })
);
