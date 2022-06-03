import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/core/services/user';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { AddToCartDialogComponent } from '@app/orders/add-to-cart-dialog/add-to-cart-dialog.component';
import { DeleteDialogComponent } from '@app/shared/delete-dialog/delete-dialog.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductStorage } from '../products-files-storage.service';
import { getProduct, State } from '../store/selectors/products.selector';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit {
  product$!: Observable<Product>;
  user$?: Observable<User | null>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private userStore: Store<UserState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.user$ = this.userStore.select(getAuthentification);
    this.product$ = this.store.select(getProduct);
  }

  contactProductOwner(product: Product) {}

  addToCart(product: Product) {
    let dialogref = this.dialog.open(AddToCartDialogComponent, {
      width: '450px',
      data: product,
    });
  }
}
