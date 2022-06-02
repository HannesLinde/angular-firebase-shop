import { Component, OnDestroy, OnInit } from '@angular/core';
import { State } from '@app/product-category/store/selectors/product-category.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductPageActions } from './store/actions';
import { changeDisplay, getLoading } from './store/selectors/products.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor(private store: Store<State>) {}

  displayMode$!: Observable<string>;
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.displayMode$ = this.store.select(changeDisplay);
  }
}
