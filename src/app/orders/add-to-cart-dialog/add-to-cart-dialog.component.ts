import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@app/products/models/product.model';
import { State, Store } from '@ngrx/store';
import { OrderPageActions } from '../store/actions';
import { OrderState } from '../store/reducers/orders.reducer';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css'],
})
export class AddToCartDialogComponent implements OnInit {
  product: Product;
  detailForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddToCartDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product,
    private orderStore: Store<OrderState>,
    private fb: FormBuilder
  ) {
    this.product = data;
  }

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addToCart() {
    if (this.detailForm.valid)
      this.orderStore.dispatch(
        // will create a not submitted
        OrderPageActions.addProductToCart({
          detail: {
            productId: this.product.id,
            orderPrice: this.product.price,
            quantity: this.detailForm.value.quantity,
          },
        })
      );

    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
