import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/products.reducer';

export interface State extends AppState {
  products: ProductState;
}

const getProductCategoryFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductCategoryFeatureState, (state) => state.products);

export const getProduct = createSelector(getProductCategoryFeatureState, (state) => state.product);
