export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
}

export interface Pagination<T> {
  page: number;
  total: number;
  data: T | null;
}
