import { Product } from '../models/product.model';

export class ProductsListDataSource {
  constructor() {}

  static sortingDataAccessor = (row: Product, columnName: string): string => {
    if (columnName == 'category') return row.category?.name ?? '';
    var columnValue = row[columnName as keyof Product] as string;
    return columnValue;
  };

  static filterPredicate = (data: any, filter: string) => {
    return data.name.toLocaleLowerCase().includes(filter) || data.category.name.toLocaleLowerCase().includes(filter);
  };
}
