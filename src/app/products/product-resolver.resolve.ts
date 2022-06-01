import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { url } from 'inspector';
import { map, Observable, first } from 'rxjs';
import { Product } from './models/product.model';
import { ProductActions } from './store/actions';
import { ProductState } from './store/reducers/products.reducer';
import { getProduct, getProducts } from './store/selectors/products.selector';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<Product | undefined> {
  constructor(private productStore: Store<ProductState>, private readonly router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product | Observable<Product | undefined> | Promise<Product | undefined> | undefined {
    const urlId = route.paramMap.get('id');
    if (urlId) {
      this.productStore.dispatch(ProductActions.getProduct({ id: urlId }));
    } else {
      this.router.navigate(['404']);
    }

    return this.productStore.select(getProduct).pipe(first());
  }
}
