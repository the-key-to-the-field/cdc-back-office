"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Categories from "@/components/categories/Categories";

const queryClient = new QueryClient();

export default function CategoriesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Categories />
    </QueryClientProvider>
  );
}
