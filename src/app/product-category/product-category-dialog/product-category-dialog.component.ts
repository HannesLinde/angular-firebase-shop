import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategoryItem } from '../product-category-datasource';

@Component({
  selector: 'app-product-category-dialog',
  templateUrl: './product-category-dialog.component.html',
  styleUrls: ['./product-category-dialog.component.css'],
})
export class ProductCategoryDialogComponent implements OnInit {
  action: string;
  category: ProductCategoryItem;
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductCategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { category: ProductCategoryItem; action: string }
  ) {
    this.category = data.category;
    this.action = data.action;
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
    this.categoryForm.patchValue(this.category);
  }

  ngOnInit(): void {}

  doAction() {
    if (this.categoryForm.valid) {
      this.dialogRef.close({ action: this.action, category: { ...this.category, ...this.categoryForm.value } });
    }
  }

  closeDialog() {
    this.dialogRef.close({ action: 'Cancel' });
  }
}
