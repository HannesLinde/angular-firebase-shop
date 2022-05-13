import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDialogComponent } from './product-category-dialog/product-category-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCategoryRoutingModule.components, ProductCategoryDialogComponent],
  imports: [SharedModule, ProductCategoryRoutingModule, CommonModule, ReactiveFormsModule],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
