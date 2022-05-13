import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ProductCategoryDataSource, ProductCategoryItem} from './product-category-datasource';
import {ProductCategoryService} from './product-category.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductCategoryItem>;
  dataSource: ProductCategoryDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  sub: Subscription | null = null;

  constructor(private productCategoryService: ProductCategoryService) {
    this.dataSource = new ProductCategoryDataSource();
  }

  ngOnInit(): void {
    this.sub = this.productCategoryService.getAll().subscribe((data) => {
      this.dataSource.data = [...data];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      console.log("categories changed")
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

}
