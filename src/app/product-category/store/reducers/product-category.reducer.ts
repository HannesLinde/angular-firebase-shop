import { ProductCategory } from '@app/product-category/models/product-category.model';
import { createReducer, on } from '@ngrx/store';
import { ProductCategoryActions, ProductCategoryPageActions } from '../actions';

export interface ProductCategoryState {
  categories: ProductCategory[];
  error: string;
  isLoading: boolean;
}

export const initialState: ProductCategoryState = {
  categories: [],
  error: '',
  isLoading: false,
};

export const productReducer = createReducer<ProductCategoryState>(
  initialState,
  on(ProductCategoryPageActions.loadProductCategories, (state): ProductCategoryState => {
    return {
      ...state,
      error: '',
      isLoading: true,
    };
  }),
  on(ProductCategoryActions.loadProductCategoriesSuccess, (state, { categories }): ProductCategoryState => {
    return {
      ...state,
      categories: categories,
      error: '',
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.loadProductCategoriesFailure, (state, action): ProductCategoryState => {
    return {
      ...state,
      categories: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.deleteProductCategoriesSuccess, (state): ProductCategoryState => {
    return {
      ...state,
      error: '',
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.deleteProductCategoriesFailure, (state, { error }): ProductCategoryState => {
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
  on(ProductCategoryPageActions.setLoading, (state, { isLoading }): ProductCategoryState => {
    return {
      ...state,
      isLoading,
    };
  })
);
