"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BlogPage from "@/components/blogs/BlogPage";

const queryClient = new QueryClient();

export default function Blogs() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPage />
    </QueryClientProvider>
  );
}
