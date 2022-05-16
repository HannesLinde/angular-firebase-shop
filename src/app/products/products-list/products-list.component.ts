import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductActions } from '../store/actions';
import { getProducts, State } from '../store/selectors/products.selector';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private sub: Subscription | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: MatTableDataSource<Product>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'category'];

  constructor(private store: Store<State>) {
    this.dataSource = new MatTableDataSource<Product>([]);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.sub = this.store.select(getProducts).subscribe((data: Product[]) => {
      if (this.table) {
        this.dataSource = new MatTableDataSource<Product>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // to check if better solution exist
        this.dataSource.sortingDataAccessor = (row: Product, columnName: string): string => {
          if (columnName == 'category') return row.category?.name ?? '';
          var columnValue = row[columnName as keyof Product] as string;
          return columnValue;
        };
        this.table.dataSource = this.dataSource;
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
