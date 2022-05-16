import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductCategory } from './models/product-category.model';
import { ProductCategoryDialogComponent } from './product-category-dialog/product-category-dialog.component';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryActions } from './store/actions';
import { getProductCategories, State } from './store/selectors/product-category.selector';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductCategory>;
  dataSource: MatTableDataSource<ProductCategory>;
  private sub: Subscription | null = null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private productCategoryService: ProductCategoryService,
    private dialog: MatDialog,
    private store: Store<State>
  ) {
    this.dataSource = new MatTableDataSource<ProductCategory>([]);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductCategoryActions.loadProductCategories());
    this.sub = this.store.select(getProductCategories).subscribe((data: ProductCategory[]) => {
      // as the ViewChild are only ready when the view is rundered and to avoid 'NG0100 issue'
      if (this.table) {
        this.dataSource = new MatTableDataSource<ProductCategory>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    });
  }

  openDialog(category: any, action: string) {
    let dialogRef = this.dialog.open(ProductCategoryDialogComponent, {
      width: '450px',
      data: { category, action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'Add':
            this.add(result.category);
            break;
          case 'Update':
            this.update(result.category);
            break;
          case 'Delete':
            this.delete(result.category);
            break;
          default:
            break;
        }
      }
    });
  }

  add(category: ProductCategory) {
    this.productCategoryService.add(category);
  }

  delete(category: ProductCategory) {
    this.productCategoryService.delete(category.id);
  }

  update(category: ProductCategory) {
    this.productCategoryService.update(category.id, category);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
