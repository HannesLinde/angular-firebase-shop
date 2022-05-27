import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductCategoryState } from '../reducers/product-category.reducer';

export interface State extends AppState {
  products: ProductCategoryState;
}

const getProductCategoryFeatureState = createFeatureSelector<ProductCategoryState>('productCategories');

export const getProductCategories = createSelector(getProductCategoryFeatureState, (state) => state.categories);

export const getError = createSelector(getProductCategoryFeatureState, (state) => state.error);
