import { useQuery } from "@tanstack/react-query";

import { Filter } from "@/models/Common";
import { getCategoriesFiltered } from "@/services/category";

export function useCategory(body: Filter) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categoriesFiltered"],
    queryFn: () => getCategoriesFiltered(body),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, refetch };
}
