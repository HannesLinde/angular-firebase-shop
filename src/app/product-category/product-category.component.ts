import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductCategory } from './models/product-category.model';
import { ProductCategoryDialogComponent } from './product-category-dialog/product-category-dialog.component';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryActions, ProductCategoryPageActions } from './store/actions';
import { getError, getLoading, getProductCategories, State } from './store/selectors/product-category.selector';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductCategory>;

  dataSource: MatTableDataSource<ProductCategory>;
  private subscriptions = new Subscription();

  errorMessage$!: Observable<string>;
  loading$!: Observable<boolean>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions'];

  constructor(
    private productCategoryService: ProductCategoryService,
    private dialog: MatDialog,
    private store: Store<State>
  ) {
    this.dataSource = new MatTableDataSource<ProductCategory>([]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductCategoryPageActions.loadProductCategories());
    this.subscriptions.add(
      this.store.select(getProductCategories).subscribe((data: ProductCategory[]) => {
        this.dataSource.data = data;
      })
    );
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
    this.store.dispatch(ProductCategoryPageActions.deleteProductCategories({ categoryId: category.id }));
    //this.productCategoryService.delete(category.id);
  }

  update(category: ProductCategory) {
    this.productCategoryService.update(category.id, category);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
