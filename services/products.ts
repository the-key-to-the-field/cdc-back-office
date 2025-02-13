"use server";

import { serverFetch } from "@/lib/serverFetch";
import { Filter } from "@/models/Common";
import { ProductResponse } from "@/models/Product";

export const createProduct = async (data: any) => {
  const response = await serverFetch({
    url: "/products",
    method: "POST",
    body: data,
  });

  return response;
};

export async function getProductsFiltered(
  body: Filter,
): Promise<ProductResponse> {
  const response = await serverFetch({
    url: "/products/filter",
    method: "POST",
    body,
  });

  return response;
}

export const getProductById = async (id: string) => {
  const response = await serverFetch({ url: `/products/${id}`, method: "GET" });

  return response;
};

export const deleteProduct = async (id: string) => {
  const response = await serverFetch({
    url: `/products/${id}`,
    method: "DELETE",
  });

  return response;
};

export const updateProduct = async (id: string, data: any) => {
  const response = await serverFetch({
    url: `/products/${id}`,
    method: "PUT",
    body: data,
  });

  return response;
};
