import { Component, OnInit } from '@angular/core';
import { State } from '@app/product-category/store/selectors/product-category.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { ProductActions, ProductPageActions } from './store/actions';
import { changeDisplay } from './store/selectors/products.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor(private store: Store<State>) {}

  displayMode$!: Observable<string>;

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.displayMode$ = this.store.select(changeDisplay);
  }
}
