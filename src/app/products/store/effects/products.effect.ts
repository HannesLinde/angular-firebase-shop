import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductActions, ProductPageActions } from '../actions';
import { mergeMap, map, catchError, of, delay } from 'rxjs';
import { ProductsService } from '@app/products/products.service';
import { ProductState } from '../reducers/products.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private productStore: Store<ProductState>
  ) {}

  loadProducts$ = createEffect(() => {
    //this.productStore.dispatch(ProductPageActions.setLoading({ isLoading: true }));
    return this.productsService.productsWithCategory$.pipe(
      delay(500),
      map((products) => ProductActions.loadProductsSuccess({ products })),
      catchError((error) => of(ProductActions.loadProductsFailure({ error })))
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProduct),
      mergeMap((action) =>
        this.productsService.getProductWithCategory(action.id).pipe(
          map((product) => ProductActions.getProductSuccess({ product })),
          catchError((error) => of(ProductActions.getProductFailure({ error })))
        )
      )
    );
  });
}
