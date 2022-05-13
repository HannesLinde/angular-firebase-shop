import { ProductCategoryItem } from '@app/product-category/product-category-datasource';
import { createReducer, on } from '@ngrx/store';
import { ProductCategoryActions } from '../actions';

export interface ProductCategoryState {
  categories: ProductCategoryItem[];
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
