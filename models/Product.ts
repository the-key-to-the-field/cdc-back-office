export interface Product {
  _id: string;
  name: string;
  price: number;
  currency?: string | null;
  description: string;
  images: string[];
  image: string;
  imageKeys: string[];
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
