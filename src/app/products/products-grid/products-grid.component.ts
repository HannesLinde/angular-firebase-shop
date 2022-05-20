import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductActions } from '../store/actions';
import { displayMode } from '../store/actions/products-page.action';
import { getProducts, State } from '../store/selectors/products.selector';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css'],
})
export class ProductsGridComponent implements OnInit, OnDestroy {
  //private subscriptions = new Subscription();
  productWithCategories$!: Observable<Product[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.productWithCategories$ = this.store.select(getProducts);
  }

  ngOnDestroy(): void {}

  onChangeDisplay() {
    this.store.dispatch(displayMode({ displayMode: 'List' }));
  }
}
