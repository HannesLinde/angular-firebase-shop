export class ProductCategory {
  name: string;
  id: string;
  description?: string;

  constructor(id: string, name: string, description?: string) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
