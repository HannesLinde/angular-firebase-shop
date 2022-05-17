import { Product } from '../models/product.model';

export class ProductsListDataSource {
  constructor() {}

  static sortingDataAccessor = (row: Product, columnName: string): string => {
    if (columnName == 'category') return row.category?.name ?? '';
    var columnValue = row[columnName as keyof Product] as string;
    return columnValue;
  };

  static filterPredicate = (data: any, filter: string) => {
    const accumulator = (currentTerm: string, key: string) => {
      return key === 'category' ? currentTerm + data.category.name : currentTerm + data[key];
    };
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  };
}
