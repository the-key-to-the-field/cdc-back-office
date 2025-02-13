import { useQuery } from "@tanstack/react-query";

import { getProductsFiltered } from "@/services/products";
import { Filter } from "@/models/Common";

export function useProduct(body: Filter) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["productsFiltered"],
    queryFn: () => getProductsFiltered(body),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, refetch };
}
