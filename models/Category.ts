export interface Category {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  imageKey?: string;
  image?: string;
}

export interface CategoryResponse {
  items: Category[];
  total: number;
  page: number;
  pages: number;
}

export interface CategoryForm {
  name: string;
  imageKey?: string;
  image?: string;
}