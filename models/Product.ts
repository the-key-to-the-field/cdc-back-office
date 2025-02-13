export interface Product {
  _id: string;
  name: string;
  price: number;
  currency?: string | null;
  description: string;
  image: string;
  imageKey: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProductResponse {
  items: Product[];
  total: number;
  page: number;
  pages: number;
}
