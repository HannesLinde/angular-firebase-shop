import { Injectable } from '@angular/core';
import { ProductCategoryService } from '@app/product-category/product-category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductCategoryActions, ProductCategoryPageActions } from '../actions';
import { mergeMap, map, catchError, of, from, withLatestFrom, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductState } from '@app/products/store/reducers/products.reducer';
import { getProducts } from '@app/products/store/selectors/products.selector';

@Injectable()
export class ProductCategoryEffect {
  constructor(
    private actions$: Actions,
    private productCategoryService: ProductCategoryService,
    private productStore: Store<ProductState>
  ) {}

  loadProductCategories$ = createEffect(() => {
    return this.productCategoryService.getAll().pipe(
      delay(500), // this delay is insignificant, just to show the loading because data loading quickly
      map((categories) => ProductCategoryActions.loadProductCategoriesSuccess({ categories })),
      catchError((error) => of(ProductCategoryActions.loadProductCategoriesFailure({ error })))
    );
  });

  deleteProductCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductCategoryPageActions.deleteProductCategories),
      withLatestFrom(this.productStore.select(getProducts)),
      mergeMap(([action, products]) => {
        const isCategoryRelatedToProducts = products.some((product) => product.categoryId === action.categoryId);
        if (isCategoryRelatedToProducts) {
          return of(
            ProductCategoryActions.deleteProductCategoriesFailure({
              error: 'Some products are related to such category',
            })
          );
        } else
          return from(this.productCategoryService.delete(action.categoryId)).pipe(
            map(() => ProductCategoryActions.deleteProductCategoriesSuccess()),
            catchError((error) => of(ProductCategoryActions.deleteProductCategoriesFailure({ error })))
          );
      })
    );
  });
}
