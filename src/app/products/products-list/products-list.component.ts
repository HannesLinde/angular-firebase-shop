import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '@app/shared/delete-dialog/delete-dialog.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../products.service';
import { ProductActions } from '../store/actions';
import { getProducts, State } from '../store/selectors/products.selector';
import { ProductsListDataSource } from './products-list-datasource';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy, AfterViewInit {
  private sub: Subscription | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: MatTableDataSource<Product>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'category', 'actions'];

  constructor(private dialog: MatDialog, private store: Store<State>, private productService: ProductsService) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = ProductsListDataSource.sortingDataAccessor;
    this.dataSource.filterPredicate = ProductsListDataSource.filterPredicate;
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.sub = this.store.select(getProducts).subscribe((data: Product[]) => {
      this.dataSource.data = data;
    });
  }

  openDialog(element: Product) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: { identifier: element.id, display: element.name },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.productService.delete(result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
