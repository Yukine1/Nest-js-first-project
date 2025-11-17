export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
}

export interface Pagination<T> {
  pagination: {
    page: number;
    total: number;
    limit?: number | null;
    nextPage?: number | null;
  };
  data: T | null;
}
