"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProductsPage from "@/components/products/Products";

const queryClient = new QueryClient();

export default function Products() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  );
}
