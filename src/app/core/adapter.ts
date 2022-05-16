export interface Adapter<T, R> {
  toModel(data: R): T;
  toDto(data: T): R;
}
