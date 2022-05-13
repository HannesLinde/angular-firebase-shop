import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ProductsListComponent, ProductsGridComponent, ProductsEditComponent],
  imports: [CommonModule, SharedModule],
})
export class ProductsModule {}
