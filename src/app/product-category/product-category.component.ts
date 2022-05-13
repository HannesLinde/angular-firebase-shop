import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductCategoryDataSource, ProductCategoryItem } from './product-category-datasource';
import { ProductCategoryDialogComponent } from './product-category-dialog/product-category-dialog.component';
import { ProductCategoryService } from './product-category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductCategoryItem>;
  dataSource: MatTableDataSource<ProductCategoryItem>;
  private sub: Subscription | null = null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private productCategoryService: ProductCategoryService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ProductCategoryItem>([]);
  }

  ngOnInit(): void {
    this.sub = this.productCategoryService.getAll().subscribe((data: ProductCategoryItem[]) => {
      this.dataSource = new MatTableDataSource<ProductCategoryItem>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
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

  add(category: ProductCategoryItem) {
    this.productCategoryService.add(category);
  }

  delete(category: ProductCategoryItem) {
    this.productCategoryService.delete(category.id);
  }

  update(category: ProductCategoryItem) {
    this.productCategoryService.update(category.id, category);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
