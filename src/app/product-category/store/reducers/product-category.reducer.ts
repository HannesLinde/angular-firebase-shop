import { ProductCategory } from '@app/product-category/models/product-category.model';
import { createReducer, on } from '@ngrx/store';
import { ProductCategoryActions } from '../actions';

export interface ProductCategoryState {
  categories: ProductCategory[];
  error: string;
}

export const initialState: ProductCategoryState = {
  categories: [],
  error: '',
};

export const productReducer = createReducer<ProductCategoryState>(
  initialState,
  on(ProductCategoryActions.loadProductCategoriesSuccess, (state, action): ProductCategoryState => {
    return {
      ...state,
      categories: action.categories,
      error: '',
    };
  }),
  on(ProductCategoryActions.loadProductCategoriesFailure, (state, action): ProductCategoryState => {
    return {
      ...state,
      categories: [],
      error: action.error,
    };
  })
);
