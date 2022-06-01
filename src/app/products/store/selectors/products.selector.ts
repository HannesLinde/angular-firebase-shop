import { AppState } from '@app/store/reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/products.reducer';

export interface State extends AppState {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductFeatureState, (state) => state.products);

export const getProduct = createSelector(getProductFeatureState, (state) => state.product);

export const getError = createSelector(getProductFeatureState, (state) => state.error);

export const changeDisplay = createSelector(getProductFeatureState, (state) => state.displayMode);

export const getLoading = createSelector(getProductFeatureState, (state) => state.isLoading);
