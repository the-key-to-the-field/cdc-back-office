import { serverFetch } from "@/lib/serverFetch";
import { Blog, BlogResponse } from "@/models/Blog";
import { Filter } from "@/models/Common";

export const createBlog = async (data: any) => {
  const response = await serverFetch({
    url: "/blogs",
    method: "POST",
    body: data,
  });

  return response;
};

export const getBlogs = async () => {
  const response = await serverFetch({ url: "/blogs", method: "GET" });

  return response;
};

export async function getBlogsFiltered(body: Filter): Promise<BlogResponse> {
  const response = await serverFetch({
    url: "/blogs/filter",
    method: "POST",
    body,
  });

  return response;
}

export const getBlogById = async (id: string) => {
  const response = await serverFetch({ url: `/blogs/${id}`, method: "GET" });

  return response;
};

export const deleteBlog = async (id: string) => {
  const response = await serverFetch({ url: `/blogs/${id}`, method: "DELETE" });

  return response;
};

export const updateBlog = async (id: string, data: Blog) => {
  const response = await serverFetch({
    url: `/blogs/${id}`,
    method: "PUT",
    body: data,
  });

  return response;
};
