import { serverFetch } from "@/lib/serverFetch";
import { Category, CategoryResponse } from "@/models/Category";
import { Filter } from "@/models/Common";

export async function getCategoriesFiltered(
  body: Filter,
): Promise<CategoryResponse> {
  const response = await serverFetch({
    url: "/categories/filter",
    method: "POST",
    body,
  });

  return response;
}

export const getAllCategories = async () => {
  const response = await serverFetch({
    url: "/categories",
    method: "GET",
  });

  return response;
};

export const getCategoryById = async (id: string) => {
  const response = await serverFetch({
    url: `/categories/${id}`,
    method: "GET",
  });

  return response;
};

export const deleteCategory = async (id: string) => {
  const response = await serverFetch({
    url: `/categories/${id}`,
    method: "DELETE",
  });

  return response;
};

export const createCategory = async (data: Category) => {
  const response = await serverFetch({
    url: "/categories",
    method: "POST",
    body: data,
  });

  return response;
};

export const updateCategory = async (id: string, data: Category) => {
  const response = await serverFetch({
    url: `/categories/${id}`,
    method: "PUT",
    body: data,
  });

  return response;
};
