import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductActions, ProductPageActions } from '../actions';
import { mergeMap, map, catchError, of, delay } from 'rxjs';
import { ProductsService } from '@app/products/products.service';

@Injectable()
export class ProductEffect {
  constructor(private actions$: Actions, private productsService: ProductsService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productsService.productsWithCategory$.pipe(
          delay(500),
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        )
      )
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
