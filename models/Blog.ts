export interface Blog {
  _id?: string;
  title: string;
  content: string;
  status?: string;
  image?: string;
  imageKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogFilter {
  title: string;
  content: string;
  page: number;
  limit: number;
  keyword: string;
}

export interface BlogResponse {
  items: Blog[];
  total: number;
  page: number;
  pages: number;
}

export interface BlogFormInputs {
  title: string;
  content: string;
  image: string;
  imageKey: string;
}
